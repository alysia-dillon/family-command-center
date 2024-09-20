export interface Task {
  dueDate: Date;
  id: string;
  isCompleted?: boolean;
  personName?: string;
  title: string;
}

export interface Event {
  date: Date;
  id: string;
  personName?: string;
  time: string;
  title: string;
}

export interface Person {
  events: Event[];
  id: string;
  name: string;
  tasks: Task[];
}
