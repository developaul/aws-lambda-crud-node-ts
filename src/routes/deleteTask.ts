import { APIGatewayProxyHandler } from 'aws-lambda'

import taskController from '../controllers/task'
import { getRespond } from '../utils/api';

export const handler: APIGatewayProxyHandler = async ({ pathParameters }) => {
  try {
    const { id } = pathParameters as { id: string }

    if (!id) throw new Error('id is required')

    await taskController.deleteTask(id)

    return getRespond({ statusCode: 200, message: 'Task deleted successfully' })
  } catch (error: Error | any) {
    if (error instanceof Error)
      return getRespond({ statusCode: 400, message: error.message })

    return getRespond({ statusCode: 500, message: error?.message })
  }
};
