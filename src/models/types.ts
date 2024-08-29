export interface Task {
  id: string;
  title: string;
  isCompleted: boolean;
  dueDate: Date;
}

export interface Person {
  id: string;
  name: string;
  tasks: Task[];
}
