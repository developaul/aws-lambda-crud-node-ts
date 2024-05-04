import { APIGatewayProxyHandler } from 'aws-lambda'

import { translateSWAPIModel } from "../utils/translate"
import { isValidSwapiEntity } from "../utils/validation"
import { getSwapiInfo } from "../utils/api"

export const handler: APIGatewayProxyHandler = async (event) => {
  const { id, entity } = event.pathParameters as { id?: string, entity: string }

  if (!isValidSwapiEntity(entity)) return {
    statusCode: 400,
    body: JSON.stringify(
      {
        detalle: 'Wrong entity'
      },
      null,
      2
    ),
  }

  const json = await getSwapiInfo({ entity, id })

  return {
    statusCode: 200,
    body: JSON.stringify(
      translateSWAPIModel(json as Record<string, string>),
      null,
      2
    ),
  };
};
