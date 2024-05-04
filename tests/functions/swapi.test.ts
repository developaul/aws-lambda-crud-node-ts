import { describe, expect, test } from '@jest/globals';
import request from 'supertest'

import { BASE_SERVER_API, swapiEntities, swapiTranslationsValues } from '../../src/utils/constant';

describe('GET /api/swapi module', () => {
  test('should respond with a 200 status code', async () => {
    for (const swapiEntity of swapiEntities) {
      const response = await request(BASE_SERVER_API).get(`/api/swapi/${swapiEntity}`).send()

      expect(response.statusCode).toBe(200)
    }
  });

  test('should respond with translated properties', async () => {
    for (const swapiEntity of swapiEntities) {
      const response = await request(BASE_SERVER_API).get(`/api/swapi/${swapiEntity}`).send()

      const [result] = response.body.results

      Object.keys(result).forEach((key) => {
        const isKeyTranslated = swapiTranslationsValues.includes(key)
        expect(isKeyTranslated).toBeTruthy()
      })
    }
  });
});

