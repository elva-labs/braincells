use aws_lambda_events::event::sqs::SqsEvent;
use aws_sdk_s3::Client as S3Client;
use lambda_runtime::{run, service_fn, tracing, Error, LambdaEvent};
use std::{env, sync::Arc};

struct AppState {
    s3_client: S3Client,
    bucket_arn: String,
}

async fn function_handler(event: LambdaEvent<SqsEvent>, state: Arc<AppState>) -> Result<(), Error> {
    for record in event.payload.records {
        let body = record.body.unwrap();
        println!("Received message body: {}", body);

        let parsed_body: serde_json::Value = serde_json::from_str(&body)?;
        let key = parsed_body["key"]
            .as_str()
            .ok_or("Missing 'key' in message body")?;

        let get_object_output = state
            .s3_client
            .get_object()
            .bucket(&state.bucket_arn)
            .key(key)
            .send()
            .await?;

        let content_length = get_object_output.content_length();
        let content_type = get_object_output.content_type().unwrap_or("unknown");
        let last_modified = get_object_output
            .last_modified()
            .map(|dt| dt.to_string())
            .unwrap_or_else(|| "unknown".to_string());

        println!(
            "Retrieved object: key={:?}, size={:?} bytes, type={:?}, last_modified={:?}",
            key,
            content_length.unwrap().to_string(),
            content_type,
            last_modified
        );
    }

    Ok(())
}

#[tokio::main]
async fn main() -> Result<(), Error> {
    tracing::init_default_subscriber();

    let bucket_arn = env::var("BUCKET_ARN").expect("BUCKET_ARN is not set");
    let config = aws_config::load_from_env().await;
    let s3_client = S3Client::new(&config);

    let state = Arc::new(AppState {
        s3_client,
        bucket_arn,
    });

    run(service_fn(|event| function_handler(event, state.clone()))).await
}
