# Image Transformer

## Usage

- `pnpm install`
- `pnpm sst dev` - for development mode
- `pnpm sst deploy` - to deploy

### Upload image

- Upload an image by sending a form data request to: `/PUT <YOUR_API_ENDPOINT>/image`
  - This will generate three new predefined sizes of your uploaded image
  - A simulated email will be sent via AWS SES to simulate notifying the finished upload and transformation
- Do a custom transformation of an already uploaded image by sending a request to: `/PUT <YOUR_API_ENDPOINT>/image?key=<YOUR_IMAGE_KEY>width=<YOUR_WIDTH>&height=<YOUR_HEIGHT>`
  - Example: `/PUT <ENDPOINT>/image?key=check.png&width=10&height=10` will access an already uploaded image with key `check.png`, and transform it to a 10x10 pixeled image

```bash
# TODO: It's imo more helpful to provide examples using curl. I think you can generate examples from Postman or whatever you're using.

curl <ENPOINT>/image?key=check.png&width=10&height=10` -d path/to/file-example
```

### Download image

- Download an image by sending a get request to: `/GET <YOUR_API_ENDPOINT>/image?key=<YOUR_IMAGE_KEY>&bucket=<YOUR_BUCKET>`
  - Example 1: `/GET <ENDPOINT>/image?key=check.png&bucket=original` will fetch the originally uploaded image with key `check.png` which is located in the original S3 bucket.
  - Example 2: `/GET <ENDPOINT>/image?key=check-transformed-size-10x10.png&bucket=transformed` will fetch the transformation of `check.png` with size 10x10 pixelslocated in the transformed S3 bucket.
  - When sending a get request you are returned a presigned URL you can use to temporarily access the requested image. The limit is set to 10 minutes.

### Delete image

- Delete an image by sending a delete request to: `/DELETE <YOUR_API_ENDPOINT>/image?key=<YOUR_IMAGE_KEY>`
  - Example: `/DELETE <ENDPOINT>/image?key=check.png` will first delete the originally uploaded image with key `check.png` which is located in the original S3 bucket. Then it will delete all transformed images related to the original image which are located in the transformed S3 bucket.

## E2E-Testing

End-to-End testing is implemented using Playwright.

### Test set-up

During implementation, some tests failed because of the projects asynchronous behaviour. This led to the following setup to ensure that the tests are testing the API according to what can be expected:

- Before all tests are run, an image will be uploaded to the original bucket. This image will be used to test all `/GET /image` cases without having to rely on an upload finishing in time.
- A different image is used to test both of the projects `/PUT /image` cases, i.e. an original upload and a custom upload.
- Furthermore, the test is configured to only use one worker process and to be executed in serialization. This is also due to some issues experienced during implementation regarding asynchronous tasks.

After the testing process is finished, all resources created in AWS will be deleted.

### Test execution

1. Open two terminals and cd to the root folder of the project
2. Run `pnpm sst dev` from one terminal to start the project in development mode
3. Update the base URL to point towards your API endpoint
4. Run `npx playwright test` from the other terminal to execute the test

## To-do

- Smarter implementation of Zod-parsing to reduce the number of HTTP response cases
- Patch implementation of transformation and deletion queues to await-all jobs
