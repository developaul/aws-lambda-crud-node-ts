import { APIGatewayProxyHandler } from 'aws-lambda';
import AWS from 'aws-sdk'

export const handler: APIGatewayProxyHandler = async (event) => {

  const { id } = event.pathParameters as { id: string }

  const dynamodb = new AWS.DynamoDB.DocumentClient();

  const { Item: task } = await dynamodb.get({ TableName: "TaskTable", Key: { id } }).promise()

  if (!task) return {
    statusCode: 400,
    body: JSON.stringify({ message: "Task not found" })
  }

  return {
    statusCode: 200,
    body: JSON.stringify(task),
  };
};
