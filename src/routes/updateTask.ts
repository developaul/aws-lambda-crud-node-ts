import { APIGatewayProxyHandler } from 'aws-lambda'

import taskController from '../controllers/task'
import { getRespond } from '../utils/api';

export const handler: APIGatewayProxyHandler = async ({ pathParameters, body }) => {
  try {
    const { id } = pathParameters as { id: string }

    if (!id) throw new Error('id is required')

    const bodyParsed = JSON.parse(body ?? '{}')
    await taskController.updateTask({ id, updates: bodyParsed })

    return getRespond({ statusCode: 200, message: 'Task updated successfully' })
  } catch (error: Error | any) {
    if (error instanceof Error)
      return getRespond({ statusCode: 400, message: error.message })

    return getRespond({ statusCode: 500, message: error?.message })
  }
};
