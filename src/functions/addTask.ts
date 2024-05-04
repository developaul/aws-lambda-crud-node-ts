import { APIGatewayProxyHandler } from 'aws-lambda'
import AWS from 'aws-sdk'
import { v4 } from 'uuid'

import { AddTaskBody } from '../interfaces/task';

export const handler: APIGatewayProxyHandler = async (event) => {
  const dynamodb = new AWS.DynamoDB.DocumentClient();

  const { title, description } = JSON.parse(event.body ?? '{}') as AddTaskBody

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
    statusCode: 200,
    body: JSON.stringify(newTask),
  };
};
