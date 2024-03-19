import { test, expect, describe, expectTypeOf } from 'vitest';
import { Note } from '../models/notes';
import { Api } from 'sst/node/api';

/**
 * The goal of this exercise is to make all of these tests run
 *
 * remove ".skip" from the invocation list to activate a specific test.
 *
 *  test.skip('should create some notes', async () => ...)
 *  ->
 *  test('should create some notes', async () => ...)
 */

describe('first-api', () => {
  const user = `user-${Math.round(Math.random() * 1000_000_000)}`;
  const apiUrl = `${Api.restApi.url}/notes`;

  test('should receive an empty list', async () => {
    const res = await fetch(apiUrl, {
      headers: {
        'x-api-key': user,
      },
    });

    const payload = await res.json();

    expect(payload).toEqual([]);
  });

  test('should create some notes', async () => {
    const note: Partial<Note> = {
      text: 'lorem impsum...',
    };

    const res = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'x-api-key': user,
      },
      body: JSON.stringify(note),
    });

    const payload = (await res.json()) as Note;

    expect(payload).toEqual(
      expect.objectContaining({ text: 'lorem impsum...' }),
    );
    expectTypeOf(payload).toEqualTypeOf<Note>();
    expect(res.status).toEqual(201);

    await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'x-api-key': user,
      },
      body: JSON.stringify({ text: 'another' }),
    });

    const notesRequest = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'x-api-key': user,
      },
    });

    const notes = (await notesRequest.json()) as Note[];

    expect(notes).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          text: 'another',
        }),
        expect.objectContaining({
          text: 'lorem impsum...',
        }),
      ]),
    );
  });

  test('should create a note, then remove it', async () => {
    const noteReq = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'x-api-key': user,
      },
      body: JSON.stringify({ text: 'removable note' }),
    });

    const note = (await noteReq.json()) as Note;

    expectTypeOf(note).toEqualTypeOf<Note>();

    const readRequest = await fetch(`${apiUrl}/${note.id}`, {
      method: 'GET',
      headers: {
        'x-api-key': user,
      },
    });

    const readNote = (await readRequest.json()) as Note;

    expectTypeOf(readNote).toEqualTypeOf<Note>();
    expect(readRequest.status).toEqual(200);

    const delRequest = await fetch(`${apiUrl}/${note.id}`, {
      method: 'DELETE',
      headers: {
        'x-api-key': user,
      },
    });

    expect(delRequest.status).toEqual(204);

    const readRequest2 = await fetch(`${apiUrl}/${note.id}`, {
      method: 'GET',
      headers: {
        'x-api-key': user,
      },
    });
    expect(readRequest2.status).toEqual(404);
  });
});
