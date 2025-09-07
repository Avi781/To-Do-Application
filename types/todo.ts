export enum TodoStatus {
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE'
}

export type Todo = {
  id: string;
  title: string;
  description?: string;
  status: TodoStatus;
  createdAt: string;
  updatedAt: string;
};

export interface TodoItemProps {
  todo: Todo;
  onMarkDone: (id: string) => void;
  onDelete: (id: string) => void;
  onMarkInProgress: (id: string) => void;
}