use aws_lambda_events::event::s3::S3Event;
use lambda_runtime::{run, service_fn, tracing, Error, LambdaEvent};

async fn function_handler(event: LambdaEvent<S3Event>) -> Result<(), Error> {
    for record in event.payload.records {
        let key = record.s3.object.key.unwrap_or_default();
        println!("Item {} triggerd notification lambda", key)
    }
    Ok(())
}

#[tokio::main]
async fn main() -> Result<(), Error> {
    tracing::init_default_subscriber();

    run(service_fn(function_handler)).await
}
