import { APIGatewayProxyHandler } from 'aws-lambda'

import { translateSWAPIModel } from "../utils/translate"
import { isValidSwapiEntity } from "../utils/validation"
import { getRespond, getSwapiInfo } from "../utils/api"

export const handler: APIGatewayProxyHandler = async ({ pathParameters }) => {
  try {
    const { id, entity } = pathParameters as { id?: string, entity: string }

    if (!isValidSwapiEntity(entity)) return getRespond({ statusCode: 400, message: 'Wrong entity' })

    const json = await getSwapiInfo({ entity, id })

    const jsonTranslated = translateSWAPIModel(json as Record<string, string>)

    return {
      statusCode: 200,
      body: JSON.stringify(jsonTranslated),
    };
  } catch (error: any) {
    return getRespond({ statusCode: 500, message: error.message })
  }
};
