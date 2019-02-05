export interface BaseTodo {
  name: string;
}

export interface Todo extends BaseTodo{
  id: number;
  completed: boolean;
}
