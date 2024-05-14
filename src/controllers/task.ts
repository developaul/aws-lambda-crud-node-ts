import AWS from 'aws-sdk'
import { v4 } from 'uuid'

import { AddTaskBody, UpdateTaskArgs } from '../interfaces/task';

class TaskController {
  async addTask({ title, description }: AddTaskBody) {
    if (!title) throw new Error('title is required')
    if (!description) throw new Error('description is required')

    const dynamodb = new AWS.DynamoDB.DocumentClient();

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

    return newTask
  }

  async deleteTask(id: string) {
    const dynamodb = new AWS.DynamoDB.DocumentClient();

    const { Item: task } = await dynamodb.get({ TableName: "TaskTable", Key: { id } }).promise()

    if (!task) throw new Error('Task not found')

    await dynamodb.delete({
      TableName: 'TaskTable',
      Key: { id },
    }).promise()
  }

  async getTask(id: string) {
    const dynamodb = new AWS.DynamoDB.DocumentClient();

    const { Item: task } = await dynamodb.get({ TableName: "TaskTable", Key: { id } }).promise()

    if (!task) throw new Error('Task not found')

    return task
  }

  async getTasks() {
    const dynamodb = new AWS.DynamoDB.DocumentClient();

    const { Items: tasks } = await dynamodb.scan({ TableName: "TaskTable" }).promise()

    return tasks
  }

  async updateTask({ id, updates }: UpdateTaskArgs) {
    const { done, title, description } = updates

    if (typeof done !== 'boolean' && !title && !description)
      throw new Error('No changes provided for update')

    const dynamodb = new AWS.DynamoDB.DocumentClient();
    const updatedAt = new Date()

    const updateExpressionParts: string[] = ['updatedAt = :updatedAt'];
    const expressionAttributeValues: Record<string, Date | string | boolean> = {
      ':updatedAt': updatedAt
    };

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
}

export default new TaskController()