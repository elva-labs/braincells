mod models;

use aws_lambda_events::event::s3::S3Event;
use aws_sdk_dynamodb::Client as DynamoDbClient;
use aws_sdk_s3::Client as S3Client;
use lambda_runtime::{run, service_fn, tracing, Error, LambdaEvent};
use models::S3ObjectMetadata;
use serde_dynamo::to_item;
use std::env;

struct AppState {
    dynamodb_client: DynamoDbClient,
    s3_client: S3Client,
    table_name: String,
}

async fn function_handler(event: LambdaEvent<S3Event>, state: &AppState) -> Result<(), Error> {
    for record in event.payload.records {
        let bucket = record.s3.bucket.name.ok_or("Missing bucket name")?;
        let key = record.s3.object.key.ok_or("Missing object key")?;
        let size = record.s3.object.size.ok_or("Missing object size")?;

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
        let item = S3ObjectMetadata {
            pk: key.clone(),
            sk: last_modified.clone(),
            id: format!("{}:{}", bucket, key),
            size: size.to_string(),
            bucket,
            key,
            content_type,
            last_modified,
        };

        // Put item in DynamoDB
        let put_item_result = state
            .dynamodb_client
            .put_item()
            .table_name(&state.table_name)
            .set_item(Some(to_item(&item).unwrap()))
            .send()
            .await?;

        println!("Put item result: {:?}", put_item_result);
    }
    Ok(())
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
