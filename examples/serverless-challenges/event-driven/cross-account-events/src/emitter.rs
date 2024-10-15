use aws_sdk_eventbridge::{types::PutEventsRequestEntry, Client as EBClient};
use lambda_runtime::{run, service_fn, tracing, Error, LambdaEvent};
use serde::Deserialize;
use serde_json::Value;
use std::{env, sync::Arc};

#[derive(Deserialize)]
struct EmptyEvent {}

struct AppState {
    eb_client: EBClient,
    event_bus_name: String,
}

async fn function_handler(
    _event: LambdaEvent<EmptyEvent>,
    state: Arc<AppState>,
) -> Result<(), Error> {
    let detail = Value::Object(serde_json::Map::from_iter(vec![(
        "message".to_string(),
        Value::String("Hello from Rust Lambda!".to_string()),
    )]));

    let entry = PutEventsRequestEntry::builder()
        .source("com.example.app")
        .detail_type("Example Event")
        .detail(serde_json::to_string(&detail)?)
        .event_bus_name(&state.event_bus_name)
        .build();

    state
        .eb_client
        .put_events()
        .entries(entry)
        .send()
        .await
        .map_err(|err| Error::from(format!("Error putting event: {:?}", err)))?;

    println!("Message emitted successfully");

    Ok(())
}

#[tokio::main]
async fn main() -> Result<(), Error> {
    tracing::init_default_subscriber();

    let event_bus_name = env::var("EVENT_BUS_NAME").expect("EVENT_BUS_NAME is not set");
    let config = aws_config::load_from_env().await;
    let eb_client = EBClient::new(&config);

    let state = Arc::new(AppState {
        eb_client,
        event_bus_name,
    });

    run(service_fn(|event| function_handler(event, state.clone()))).await
}
