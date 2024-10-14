use aws_lambda_events::event::s3::S3Event;
use aws_sdk_sqs::Client as SQSClient;
use lambda_runtime::{run, service_fn, tracing, Error, LambdaEvent};
use std::{env, sync::Arc};

struct AppState {
    sqs_client: SQSClient,
    queue_url: String,
}

async fn function_handler(event: LambdaEvent<S3Event>, state: Arc<AppState>) -> Result<(), Error> {
    for record in event.payload.records {
        let message_body = serde_json::to_string(&record.s3.object)
            .map_err(|err| Error::from(format!("Error serializing object: {:?}", err)))?;

        state
            .sqs_client
            .send_message()
            .queue_url(&state.queue_url)
            .message_body(message_body)
            .send()
            .await
            .map_err(|err| Error::from(format!("Error pushing message: {:?}", err)))?;

        println!("Message pushed successfully")
    }
    Ok(())
}

#[tokio::main]
async fn main() -> Result<(), Error> {
    tracing::init_default_subscriber();

    let queue_url = env::var("QUEUE_URL").expect("QUEUE_URL is not set");
    let config = aws_config::load_from_env().await;
    let sqs_client = SQSClient::new(&config);

    let state = Arc::new(AppState {
        sqs_client,
        queue_url,
    });

    run(service_fn(|event| function_handler(event, state.clone()))).await
}
