use aws_lambda_events::event::s3::S3Event;
use aws_sdk_dynamodb::types::AttributeValue;
use aws_sdk_dynamodb::Client as DynamoDbClient;
use aws_sdk_s3::Client as S3Client;
use lambda_runtime::{run, service_fn, tracing, Error, LambdaEvent};
use serde_json::json;
use std::env;

struct AppState {
    dynamodb_client: DynamoDbClient,
    s3_client: S3Client,
    table_name: String,
}

async fn function_handler(event: LambdaEvent<S3Event>, state: &AppState) -> Result<(), Error> {
    for record in event.payload.records {
        let bucket = record.s3.bucket.name.unwrap_or_default();
        let key = record.s3.object.key.unwrap_or_default();
        let size = record.s3.object.size.unwrap_or_default();

        // Get object metadata from S3
        let head_object = state
            .s3_client
            .head_object()
            .bucket(&bucket)
            .key(&key)
            .send()
            .await?;

        let content_type = head_object.content_type().unwrap_or_default().to_string();
        let last_modified = head_object
            .last_modified()
            .map(|dt| dt.to_string())
            .unwrap_or_default();

        // Prepare DynamoDB item
        let item = json!({
            "pk": key,
            "sk": last_modified,
            "id": format!("{}:{}", bucket, key),
            "bucket": bucket,
            "key": key,
            "size": size.to_string(),
            "content_type": content_type,
            "last_modified": last_modified,
        });

        // Put item in DynamoDB
        let put_item_result = state
            .dynamodb_client
            .put_item()
            .table_name(&state.table_name)
            .set_item(Some(convert_to_attribute_values(item)))
            .send()
            .await?;

        println!("Put item result: {:?}", put_item_result);
    }
    Ok(())
}

fn convert_to_attribute_values(
    json: serde_json::Value,
) -> std::collections::HashMap<String, AttributeValue> {
    json.as_object()
        .unwrap()
        .iter()
        .map(|(k, v)| {
            (
                k.clone(),
                match v {
                    serde_json::Value::String(s) => AttributeValue::S(s.clone()),
                    serde_json::Value::Number(n) => AttributeValue::N(n.to_string()),
                    serde_json::Value::Bool(b) => AttributeValue::Bool(*b),
                    _ => AttributeValue::Null(true),
                },
            )
        })
        .collect()
}

#[tokio::main]
async fn main() -> Result<(), Error> {
    tracing::init_default_subscriber();

    let table_name = env::var("TABLE_NAME").expect("TABLE_NAME is not set");
    let config = aws_config::load_from_env().await;
    let dynamodb_client = DynamoDbClient::new(&config);
    let s3_client = S3Client::new(&config);

    let state = AppState {
        dynamodb_client,
        s3_client,
        table_name,
    };

    run(service_fn(|event| function_handler(event, &state))).await
}
