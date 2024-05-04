import { APIGatewayProxyHandler } from 'aws-lambda'
import AWS from 'aws-sdk'

export const handler: APIGatewayProxyHandler = async (event) => {
  const { id } = event.pathParameters as { id: string }
  const { done, title, description } = JSON.parse(event.body ?? '{}')

  const dynamodb = new AWS.DynamoDB.DocumentClient();
  const updatedAt = new Date()

  await dynamodb.update({
    TableName: 'TaskTable',
    Key: { id },
    UpdateExpression: 'SET done = :done, updatedAt = :updatedAt, title = :title, description = :description',
    ExpressionAttributeValues: {
      ':done': done,
      ':updatedAt': updatedAt,
      ':title': title,
      ':description': description
    },
    ReturnValues: 'ALL_NEW'
  }).promise()

  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Task updated successfully' }),
  };
};
