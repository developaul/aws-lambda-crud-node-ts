export interface AddTaskBody {
  title: string;
  description: string
}

export interface UpdateTaskArgs {
  id: string;
  updates: {
    done?: boolean;
    title?: string;
    description?: string;
  };
}