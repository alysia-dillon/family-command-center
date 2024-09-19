export interface Task {
  id: string;
  title: string;
  isCompleted: boolean;
  dueDate: Date;
  personName: string;
}

export interface Event {
  id: string;
  title: string;
  date: Date;
  personName: string;
}

export interface Person {
  id: string;
  name: string;
  tasks: Task[];
  events: Event[];
}
