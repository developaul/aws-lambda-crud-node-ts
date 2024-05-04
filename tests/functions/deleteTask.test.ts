import { describe, expect, test } from '@jest/globals';
import request from 'supertest'

import { BASE_SERVER_API } from '../../src/utils/constant';

describe('DELETE /api/tasks module', () => {
  test('should respond with a 200 status code', async () => {
    const createRespond = await request(BASE_SERVER_API).post('/api/tasks').send({ title: 'Test task', description: 'Just a test' })
    expect(createRespond.statusCode).toBe(201)

    const { body: task } = createRespond
    const deleteResponse = await request(BASE_SERVER_API).delete(`/api/tasks/${task.id}`)
    expect(deleteResponse.statusCode).toBe(200)
  });

  test('Should respond with a 400 status code', async () => {
    const deleteResponse = await request(BASE_SERVER_API).delete(`/api/tasks/fakeId`)
    expect(deleteResponse.statusCode).toBe(400)
  });
});

