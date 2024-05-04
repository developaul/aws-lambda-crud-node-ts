import { APIGatewayProxyHandler } from 'aws-lambda'
import AWS from 'aws-sdk'

export const handler: APIGatewayProxyHandler = async (event) => {
  const { id } = event.pathParameters as { id: string }

  const dynamodb = new AWS.DynamoDB.DocumentClient();

  await dynamodb.delete({
    TableName: 'TaskTable',
    Key: { id },
  }).promise()

  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Task deleted successfully' }),
  };
};
