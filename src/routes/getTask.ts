import { APIGatewayProxyHandler } from 'aws-lambda';

import taskController from '../controllers/task'
import { getRespond } from '../utils/api';

export const handler: APIGatewayProxyHandler = async ({ pathParameters }) => {
  try {
    const { id } = pathParameters as { id: string }

    if (!id) throw new Error('id is required')

    const task = await taskController.getTask(id)

    return {
      statusCode: 200,
      body: JSON.stringify(task),
    };
  } catch (error: Error | any) {
    if (error instanceof Error)
      return getRespond({ statusCode: 400, message: error.message })

    return getRespond({ statusCode: 500, message: error?.message })
  }
};
