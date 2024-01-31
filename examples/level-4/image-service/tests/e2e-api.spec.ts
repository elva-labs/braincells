import { test, expect } from '@playwright/test';
import * as fs from 'fs';

const TEST_IMAGE_KEY = 'bounce2.png';
const ORIGINAL_IMAGE_KEY = 'check.png';
const CONTENT_TYPE = 'image/png';
const CUSTOM_IMAGE_KEY = 'check-transformed-size-10x10.png';
const SMALL_TRANSFORMED_KEY = 'check-transformed-size-s.png';
const MEDIUM_TRANSFORMED_KEY = 'check-transformed-size-m.png';
const LARGE_TRANSFORMED_KEY = 'check-transformed-size-l.png';
const ORIGINAL_IMAGE_SIZE = 23927;
const CUSTOM_IMAGE_SIZE = 366;
const SMALL_IMAGE_SIZE = 5316;
const MEDIUM_IMAGE_SIZE = 19568;
const LARGE_IMAGE_SIZE = 44055;
const CUSTOM_IMAGE_FORMAT = 'width=10&height=10';
const TRANSFORMED_BUCKET = 'transformed';
const REDIRECT_URL_PART = 'X-Amz-SignedHeaders=host&x-id=GetObject';

test.describe.configure({ mode: 'serial' });

test.describe('Image Service', () => {
  test.describe('Single upload', () => {
    test('Upload image', async ({ request }) => {
      const imageBuffer = fs.createReadStream(
        `tests/testImages/${TEST_IMAGE_KEY}`,
      );
      const response = await request.put('/images/unit-1', {
        multipart: {
          img1: imageBuffer,
        },
      });

      expect(response).toBeOK();
    });

    test('Download image', async ({ request }) => {
      expect(async () => {
        const response = await request.get(`/images/${ORIGINAL_IMAGE_KEY}`);
        expect(response.url()).toContain(REDIRECT_URL_PART);
        expect(response.headers()['content-type']).toEqual(CONTENT_TYPE);
        expect(+response.headers()['content-length']).toEqual(
          ORIGINAL_IMAGE_SIZE,
        );
      }).toPass({
        intervals: [1_000],
        timeout: 10_000,
      });
    });
  });

  // /GET CUSTOM UPLOADED IMAGE FROM TRANSFORMED BUCKET
  test('get custom upload image', async ({ request }) => {
    expect(async () => {
      const response = await request.get(
        `/image?key=${CUSTOM_IMAGE_KEY}&bucket=${TRANSFORMED_BUCKET}`,
      );
      expect(response.url()).toContain(REDIRECT_URL_PART);
      expect(response.headers()['content-type']).toEqual(CONTENT_TYPE);
      expect(+response.headers()['content-length']).toEqual(CUSTOM_IMAGE_SIZE);
      expect(response.body()).toBeDefined();
    }).toPass({
      intervals: [1_000],
      timeout: 10_000,
    });
  });

  // /GET SMALL TRANSFORMED IMAGE FROM TRANSFORMED BUCKET
  test('get small transformed image', async ({ request }) => {
    expect(async () => {
      const response = await request.get(
        `/image?key=${SMALL_TRANSFORMED_KEY}&bucket=${TRANSFORMED_BUCKET}`,
      );
      expect(response.url()).toContain(REDIRECT_URL_PART);
      expect(response.headers()['content-type']).toEqual(CONTENT_TYPE);
      expect(+response.headers()['content-length']).toEqual(SMALL_IMAGE_SIZE);
      expect(response.body()).toBeDefined();
    }).toPass({
      intervals: [1_000],
      timeout: 10_000,
    });
  });

  // /GET MEDIUM TRANSFORMED IMAGE FROM TRANSFORMED BUCKET
  test('get medium transformed image', async ({ request }) => {
    expect(async () => {
      const response = await request.get(
        `/image?key=${MEDIUM_TRANSFORMED_KEY}&bucket=${TRANSFORMED_BUCKET}`,
      );
      expect(response.url()).toContain(REDIRECT_URL_PART);
      expect(response.headers()['content-type']).toEqual(CONTENT_TYPE);
      expect(+response.headers()['content-length']).toEqual(MEDIUM_IMAGE_SIZE);
      expect(response.body()).toBeDefined();
    }).toPass({
      intervals: [1_000],
      timeout: 10_000,
    });
  });

  // /GET LARGE TRANSFORMED IMAGE FROM TRANSFORMED BUCKET
  test('get large transformed image', async ({ request }) => {
    expect(async () => {
      const response = await request.get(
        `/image?key=${LARGE_TRANSFORMED_KEY}&bucket=${TRANSFORMED_BUCKET}`,
      );
      expect(response.url()).toContain(REDIRECT_URL_PART);
      expect(response.headers()['content-type']).toEqual(CONTENT_TYPE);
      expect(+response.headers()['content-length']).toEqual(LARGE_IMAGE_SIZE);
      expect(response.body()).toBeDefined();
    }).toPass({
      intervals: [1_000],
      timeout: 10_000,
    });
  });

  // /PUT CUSTOM IMAGE FORMAT
  test('custom image format upload', async ({ request }) => {
    const response = await request.put(
      `/image/custom?key=${TEST_IMAGE_KEY}&${CUSTOM_IMAGE_FORMAT}`,
    );
    expect(response.ok()).toBeTruthy();
  });

  test('delete original and its transformed images', async ({ request }) => {
    const deleteOriginal = await request.delete(`/image?key=unit-1.1`);
    const deleteTest = await request.delete(`/image?key=${TEST_IMAGE_KEY}`);
    expect(deleteOriginal.ok()).toBeTruthy();
    expect(deleteTest.ok()).toBeTruthy();
  });
});
