import { describe, expect, test } from '@jest/globals';
import request from 'supertest'

import { BASE_SERVER_API, swapiEntities, swapiModelMock, swapiTranslationsValues } from '../../src/utils/constant';
import { translateSWAPIModel } from '../../src/utils/translate';

describe('GET /api/swapi module', () => {
  test('should respond with translated properties', async () => {
    for (const swapiEntity of swapiEntities) {
      const response = await request(BASE_SERVER_API).get(`/api/swapi/${swapiEntity}`)

      const [result] = response.body.results

      Object.keys(result).forEach((key) => {
        const isKeyTranslated = swapiTranslationsValues.includes(key)
        expect(isKeyTranslated).toBeTruthy()
      })
    }
  });

  test('Should translate swapi model to spanish', () => {
    const swapiModelMockTranslated = translateSWAPIModel(swapiModelMock)

    Object.keys(swapiModelMockTranslated).forEach((key) => {
      const isKeyTranslated = swapiTranslationsValues.includes(key)
      expect(isKeyTranslated).toBeTruthy()
    })
  })

  test('Should respond with a message "Wrong entity"', async () => {
    const response = await request(BASE_SERVER_API).get(`/api/swapi/wrongEntity`)

    expect(response.body.message).toBe('Wrong entity')
  })
});

