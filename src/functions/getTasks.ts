import AWS from 'aws-sdk'

export const handler = async () => {
  const dynamodb = new AWS.DynamoDB.DocumentClient();

  const { Items: tasks } = await dynamodb.scan({ TableName: "TaskTable" }).promise()

  return {
    statusCode: 200,
    body: JSON.stringify(tasks),
  };
};
