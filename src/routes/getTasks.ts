import taskController from '../controllers/task'
import { getRespond } from '../utils/api';

export const handler = async () => {
  try {
    const tasks = await taskController.getTasks()

    return {
      statusCode: 200,
      body: JSON.stringify(tasks),
    };
  } catch (error: Error | any) {
    if (error instanceof Error)
      return getRespond({ statusCode: 400, message: error.message })

    return getRespond({ statusCode: 500, message: error?.message })
  }
};
