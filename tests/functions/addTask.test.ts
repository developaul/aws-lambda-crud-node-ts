import { describe, expect, test } from '@jest/globals';
import request from 'supertest'

import { BASE_SERVER_API } from '../../src/utils/constant';

describe('GET /api/swapi/addTask module', () => {
  test('should respond with a 201 status code', async () => {
    const response = await request(BASE_SERVER_API).post('/api/tasks').send({ title: 'Test task', description: 'Just a test' })

    expect(response.statusCode).toBe(201)
  });

  test('Should respond with a 400 status code', async () => {
    const response = await request(BASE_SERVER_API).post('/api/tasks').send({ description: 'Just a test error' })

    expect(response.statusCode).toBe(400)
  });

});

