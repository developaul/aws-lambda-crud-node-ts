import { APIGatewayProxyHandler } from 'aws-lambda';
import AWS from 'aws-sdk'

import { getRespond } from '../utils/api';

export const handler: APIGatewayProxyHandler = async ({ pathParameters }) => {
  try {
    const { id } = pathParameters as { id: string }

    if (!id) return getRespond({ statusCode: 400, message: 'id is required' })

    const dynamodb = new AWS.DynamoDB.DocumentClient();

    const { Item: task } = await dynamodb.get({ TableName: "TaskTable", Key: { id } }).promise()

    if (!task) return getRespond({ statusCode: 400, message: 'Task not found' })

    return {
      statusCode: 200,
      body: JSON.stringify(task),
    };
  } catch (error: any) {
    return getRespond({ statusCode: 500, message: error.message })
  }
};
