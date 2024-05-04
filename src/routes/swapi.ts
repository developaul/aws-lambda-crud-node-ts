import { APIGatewayProxyHandler } from 'aws-lambda'

// import { translateSWAPIModel } from "../utils/translate"
import { isValidSwapiEntity } from "../utils/validation"
import { getRespond, } from "../utils/api"

import swapiController from '../controllers/swapi'

export const handler: APIGatewayProxyHandler = async ({ pathParameters }) => {
  try {
    const { id, entity } = pathParameters as { id?: string, entity: string }

    if (!isValidSwapiEntity(entity)) throw new Error('Wrong entity')

    const response = await swapiController.resolve({ entity, id })

    return {
      statusCode: 200,
      body: JSON.stringify(response),
    };
  } catch (error: Error | any) {
    if (error instanceof Error)
      return getRespond({ statusCode: 400, message: error.message })

    return getRespond({ statusCode: 500, message: error?.message })
  }
};
