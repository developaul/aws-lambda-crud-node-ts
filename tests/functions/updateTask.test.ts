import { describe, expect, test } from '@jest/globals';
import request from 'supertest'

import { BASE_SERVER_API } from '../../src/utils/constant';

describe('PUT /api/tasks module', () => {
  test('should respond with a 200 status code', async () => {
    const createRespond = await request(BASE_SERVER_API).post('/api/tasks').send({ title: 'Test task', description: 'Just a test' })
    expect(createRespond.statusCode).toBe(201)

    const { body: task } = createRespond
    const updateResponse = await request(BASE_SERVER_API)
      .put(`/api/tasks/${task.id}`)
      .send({ done: true, title: 'New test task title', description: 'New just a test' })

    expect(updateResponse.statusCode).toBe(200)

    const deleteResponse = await request(BASE_SERVER_API).delete(`/api/tasks/${task.id}`)
    expect(deleteResponse.statusCode).toBe(200)
  });

  test('Should respond with a 400 status code because there not changes provided for update', async () => {
    const createRespond = await request(BASE_SERVER_API).post('/api/tasks').send({ title: 'Test task', description: 'Just a test' })
    expect(createRespond.statusCode).toBe(201)

    const { body: task } = createRespond
    const deleteResponse = await request(BASE_SERVER_API).put(`/api/tasks/${task.id}`)
    expect(deleteResponse.statusCode).toBe(400)
  });
});

