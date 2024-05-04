import AWS from 'aws-sdk'

interface UpdateTaskArgs {
  id: string;
  updates: {
    done?: boolean;
    title?: string;
    description?: string;
  };
}

export const updateTask = async ({ id, updates }: UpdateTaskArgs) => {
  const dynamodb = new AWS.DynamoDB.DocumentClient();
  const updatedAt = new Date()

  const updateExpressionParts: string[] = [];
  const expressionAttributeValues: Record<string, Date | string | boolean> = {
    ':updatedAt': updatedAt
  };

  const { done, description, title } = updates

  if (typeof done === 'boolean') {
    updateExpressionParts.push('done = :done');
    expressionAttributeValues[':done'] = done;
  }
  if (title) {
    updateExpressionParts.push('title = :title');
    expressionAttributeValues[':title'] = title;
  }
  if (description) {
    updateExpressionParts.push('description = :description');
    expressionAttributeValues[':description'] = description;
  }

  const updateExpression = 'SET ' + updateExpressionParts.join(', ');

  await dynamodb.update({
    TableName: 'TaskTable',
    Key: { id },
    UpdateExpression: updateExpression,
    ExpressionAttributeValues: expressionAttributeValues
  }).promise()
}