import { APIGatewayProxyHandler } from 'aws-lambda'

import { getRespond } from '../utils/api';
import { updateTask } from '../utils/task';

export const handler: APIGatewayProxyHandler = async ({ pathParameters, body }) => {
  try {
    const { id } = pathParameters as { id: string }

    if (!id) return getRespond({ statusCode: 400, message: 'id is required' })

    const { done, title, description } = JSON.parse(body ?? '{}')

    if (typeof done !== 'boolean' && !title && !description)
      return getRespond({ statusCode: 400, message: 'No changes provided for update' })

    await updateTask({ id, updates: { description, done, title } })

    return getRespond({ statusCode: 200, message: 'Task updated successfully' })

  } catch (error) {
    return getRespond({ statusCode: 500, message: error.message })
  }
};
