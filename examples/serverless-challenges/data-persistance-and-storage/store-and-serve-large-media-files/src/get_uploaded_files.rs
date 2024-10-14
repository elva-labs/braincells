mod models;

use aws_sdk_dynamodb::Client as DDBClient;
use lambda_http::{run, service_fn, tracing, Body, Error, Response};
use models::S3ObjectMetadata;
use serde_dynamo::from_items;
use serde_json::json;
use std::env;
use std::sync::Arc;

struct AppState {
    dynamodb_client: DDBClient,
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
    let items: Vec<S3ObjectMetadata> = from_items(scan_output.items.unwrap_or_default())
        .map_err(|e| Error::from(format!("Failed to deserialize items: {}", e)))?;

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
