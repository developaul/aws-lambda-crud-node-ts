import { APIGatewayProxyHandler } from 'aws-lambda'

import taskController from '../controllers/task'

import { getRespond } from '../utils/api';

export const handler: APIGatewayProxyHandler = async (event) => {
  try {
    const bodyParsed = JSON.parse(event.body ?? '{}')

    const newTask = await taskController.addTask(bodyParsed)

    return {
      statusCode: 201,
      body: JSON.stringify(newTask),
    };
  } catch (error: Error | any) {
    if (error instanceof Error)
      return getRespond({ statusCode: 400, message: error.message })

    return getRespond({ statusCode: 500, message: error?.message })
  }
};
