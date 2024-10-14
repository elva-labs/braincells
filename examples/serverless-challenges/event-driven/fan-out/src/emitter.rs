use aws_sdk_sns::Client as SNSClient;
use lambda_runtime::{run, service_fn, tracing, Error, LambdaEvent};
use serde::Deserialize;
use std::{env, sync::Arc};

#[derive(Deserialize)]
struct EmptyEvent {}

struct AppState {
    sns_client: SNSClient,
    topic_arn: String,
}

async fn function_handler(
    _event: LambdaEvent<EmptyEvent>,
    state: Arc<AppState>,
) -> Result<(), Error> {
    state
        .sns_client
        .publish()
        .topic_arn(&state.topic_arn)
        .message("Very important message here.")
        .send()
        .await
        .map_err(|err| Error::from(format!("Error publishing message: {:?}", err)))?;
    println!("Message published successfully");
    Ok(())
}

#[tokio::main]
async fn main() -> Result<(), Error> {
    tracing::init_default_subscriber();

    let topic_arn = env::var("TOPIC_ARN").expect("TOPIC_ARN is not set");
    let config = aws_config::load_from_env().await;
    let sns_client = SNSClient::new(&config);

    let state = Arc::new(AppState {
        sns_client,
        topic_arn,
    });

    run(service_fn(|event| function_handler(event, state.clone()))).await
}
