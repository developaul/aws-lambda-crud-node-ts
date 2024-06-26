import { describe, expect, test } from '@jest/globals';
import request from 'supertest'

import { BASE_SERVER_API } from '../../src/utils/constant';

describe('POST /api/tasks module', () => {
  test('should respond with a 201 status code', async () => {
    const createRespond = await request(BASE_SERVER_API).post('/api/tasks').send({ title: 'Test task', description: 'Just a test' })
    expect(createRespond.statusCode).toBe(201)

    const { body: task } = createRespond
    const deleteResponse = await request(BASE_SERVER_API).delete(`/api/tasks/${task.id}`).send()
    expect(deleteResponse.statusCode).toBe(200)
  });

  test('Should respond with a 400 status code', async () => {
    const createRespond = await request(BASE_SERVER_API).post('/api/tasks').send({ description: 'Just a test error' })
    expect(createRespond.statusCode).toBe(400)
  });
});

