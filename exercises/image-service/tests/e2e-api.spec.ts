import { test, expect } from '@playwright/test';
import * as fs from 'fs';

const TEST_IMAGE_KEY = 'bounce2.png';
const CONTENT_TYPE = 'image/png';
const REDIRECT_URL_PART = 'X-Amz-SignedHeaders=host&x-id=GetObject';

test.describe.configure({ mode: 'serial' });

test.describe('Image Service', () => {
  let imageId = '';

  test.describe('Single upload', () => {
    test('Upload image', async ({ request }) => {
      const imageBuffer = fs.createReadStream(
        `tests/testImages/${TEST_IMAGE_KEY}`,
      );
      const response = await request.put('/images', {
        multipart: {
          img1: imageBuffer,
        },
      });

      imageId = (await response.json()).image;

      expect(response).toBeOK();
    });

    test('Download original image', async ({ request }) => {
      await expect(async () => {
        const response = await request.get(`/images/${imageId}`);

        expect(response.url()).toContain(REDIRECT_URL_PART);
        expect(response.headers()['content-type']).toEqual(CONTENT_TYPE);
        expect(+response.headers()['content-length']).toEqual(203409);
      }).toPass({
        intervals: [1_000],
        timeout: 5_000,
      });
    });
  });

  test('Get an adhoc size', async ({ request }) => {
    await expect(async () => {
      const response = await request.get(`/images/${imageId}?w=250&h=250`);
      expect(response.url()).toContain(REDIRECT_URL_PART);
      expect(response.headers()['content-type']).toEqual(CONTENT_TYPE);
      expect(+response.headers()['content-length']).toEqual(124827);
      expect(response.body()).toBeDefined();
    }).toPass({
      intervals: [1_000],
      timeout: 5_000,
    });
  });

  test.skip('TODO: delete original and its transformed images', async ({
    request,
  }) => {
    const deleteOriginal = await request.delete(`/image/${imageId}`);

    expect(deleteOriginal.ok()).toBeTruthy();

    // + fetch old image and receive 404
  });
});
