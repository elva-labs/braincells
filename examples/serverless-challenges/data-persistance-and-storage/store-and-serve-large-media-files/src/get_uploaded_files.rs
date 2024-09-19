use aws_sdk_dynamodb::types::AttributeValue;
use lambda_http::{run, service_fn, tracing, Body, Error, Response};
use serde_json::json;
use std::env;
use std::sync::Arc;

struct AppState {
    dynamodb_client: aws_sdk_dynamodb::Client,
    table_name: String,
}

async fn function_handler(state: Arc<AppState>) -> Result<Response<Body>, Error> {
    // Perform DynamoDB scan
    let scan_output = state
        .dynamodb_client
        .scan()
        .table_name(&state.table_name)
        .send()
        .await?;

    // Process scanned items
    let items: Vec<serde_json::Value> = scan_output
        .items
        .unwrap_or_default()
        .into_iter()
        .map(process_item)
        .collect();

    // Create response
    let body = json!({
        "message": "DynamoDB Scan Results",
        "items": items
    });

    let resp = Response::builder()
        .status(200)
        .header("content-type", "application/json")
        .body(body.to_string().into())
        .map_err(Box::new)?;

    Ok(resp)
}

fn process_item(item: std::collections::HashMap<String, AttributeValue>) -> serde_json::Value {
    let mut processed_item = json!({});
    for (key, value) in item {
        processed_item[key] = match value {
            AttributeValue::S(s) => json!(s),
            AttributeValue::N(n) => json!(n),
            AttributeValue::Bool(b) => json!(b),
            AttributeValue::M(m) => json!(m
                .into_iter()
                .map(|(k, v)| (k, process_attribute_value(v)))
                .collect::<serde_json::Map<String, serde_json::Value>>()),
            AttributeValue::L(l) => json!(l
                .into_iter()
                .map(process_attribute_value)
                .collect::<Vec<serde_json::Value>>()),
            _ => json!(null),
        };
    }
    processed_item
}

fn process_attribute_value(value: AttributeValue) -> serde_json::Value {
    match value {
        AttributeValue::S(s) => json!(s),
        AttributeValue::N(n) => json!(n),
        AttributeValue::Bool(b) => json!(b),
        _ => json!(null),
    }
}

#[tokio::main]
async fn main() -> Result<(), Error> {
    tracing::init_default_subscriber();

    let table_name = env::var("TABLE_NAME").expect("TABLE_NAME is not set");
    let config = aws_config::load_from_env().await;
    let dynamodb_client = aws_sdk_dynamodb::Client::new(&config);

    // Create AppState
    let state = Arc::new(AppState {
        dynamodb_client,
        table_name,
    });

    // Run the service
    run(service_fn(move |_| function_handler(state.clone()))).await
}
