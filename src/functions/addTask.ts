import { APIGatewayProxyHandler } from 'aws-lambda'
import AWS from 'aws-sdk'
import { v4 } from 'uuid'

import { AddTaskBody } from '../interfaces/task';
import { getRespond } from '../utils/api';

export const handler: APIGatewayProxyHandler = async ({ body }) => {
  try {
    const dynamodb = new AWS.DynamoDB.DocumentClient();

    const { title, description } = JSON.parse(body ?? '{}') as AddTaskBody

    if (!title) return getRespond({ statusCode: 400, message: 'title is required' })
    if (!description) return getRespond({ statusCode: 400, message: 'description is required' })

    const createdAt = new Date()
    const id = v4()

    const newTask = {
      id,
      createdAt,
      title,
      description
    }

    await dynamodb.put({
      TableName: 'TaskTable',
      Item: newTask,
    }).promise()

    return {
      statusCode: 201,
      body: JSON.stringify(newTask),
    };
  } catch (error: any) {
    return getRespond({ statusCode: 500, message: error.message })
  }
};
