use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize)]
pub struct S3ObjectMetadata {
    pub pk: String,
    pub sk: String,
    pub id: String,
    pub size: String,
    pub bucket: String,
    pub key: String,
    pub content_type: String,
    pub last_modified: String,
}
