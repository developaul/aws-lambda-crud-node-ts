import AWS from 'aws-sdk'
import { getRespond } from '../utils/api';

export const handler = async () => {
  try {
    const dynamodb = new AWS.DynamoDB.DocumentClient();

    const { Items: tasks } = await dynamodb.scan({ TableName: "TaskTable" }).promise()

    return {
      statusCode: 200,
      body: JSON.stringify(tasks),
    };
  } catch (error: any) {
    return getRespond({ statusCode: 500, message: error.message })
  }
};
