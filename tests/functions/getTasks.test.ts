import { describe, expect, test } from '@jest/globals';
import request from 'supertest'

import { BASE_SERVER_API } from '../../src/utils/constant';

describe('GET /api/tasks module', () => {
  test('should respond with a 200 status code', async () => {
    const response = await request(BASE_SERVER_API).get('/api/tasks')

    expect(response.statusCode).toBe(200)
  });

  test('Should respond with an array of tasks', async () => {
    const response = await request(BASE_SERVER_API).get('/api/tasks')

    expect(response.body).toBeInstanceOf(Array)
  });

});

