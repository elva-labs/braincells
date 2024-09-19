use aws_config::Region;
use aws_sdk_s3::presigning::PresigningConfig;
use lambda_http::{run, service_fn, tracing, Body, Error, Request, RequestExt, Response};
use serde_json::json;
use std::env;
use std::sync::Arc;
use std::time::Duration;

struct AppState {
    s3_client: aws_sdk_s3::Client,
    bucket_name: String,
}

async fn function_handler(event: Request, state: Arc<AppState>) -> Result<Response<Body>, Error> {
    let key = event
        .query_string_parameters_ref()
        .and_then(|params| params.first("key"))
        .expect("No key for item to presign");

    let presigned_request = state
        .s3_client
        .get_object()
        .bucket(&state.bucket_name)
        .key(key)
        .presigned(PresigningConfig::expires_in(Duration::from_secs(3600))?)
        .await?;

    let presigned_url = presigned_request.uri().to_string();

    let body = json!({
    "presigned_url": presigned_url,
    "expires_in": 3600
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

    let bucket_name = env::var("BUCKET_NAME").expect("BUCKET_NAME is not set");
    let config = aws_config::from_env()
        .region(Region::new("eu-north-1"))
        .load()
        .await;
    let s3_client = aws_sdk_s3::Client::new(&config);

    let state = Arc::new(AppState {
        s3_client,
        bucket_name,
    });

    run(service_fn(move |event| {
        function_handler(event, state.clone())
    }))
    .await
}
