use lambda_runtime::{run, service_fn, Error, LambdaEvent};

use serde::{Deserialize, Serialize};

#[derive(Deserialize)]
struct Request {}

#[derive(Serialize)]
struct Response {
    statusCode: i32,
    body: String,
}

async fn function_handler(event: LambdaEvent<Request>) -> Result<Response, Error> {
    // Prepare the response
    let resp = Response {
        statusCode: 200,
        body: "Hello World!".to_string(),
    };

    Ok(resp)
}

#[tokio::main]
async fn main() -> Result<(), Error> {
    tracing_subscriber::fmt()
        .with_max_level(tracing::Level::INFO)
        .with_target(false)
        .without_time()
        .init();

    run(service_fn(function_handler)).await
}

