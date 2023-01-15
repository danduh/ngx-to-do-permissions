export interface BaseTodo {
  name: string;
  completed: boolean;
}

export interface Todo extends BaseTodo {
  id: number;
}
