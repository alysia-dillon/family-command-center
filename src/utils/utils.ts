import { Task } from "@deps/models/types";

export const getTasksForToday = (tasks: Task[]): Task[] => {
  const today = new Date().toDateString();
  return tasks.filter(
    (task) => new Date(task.dueDate).toDateString() === today
  );
};

export const getTasksForWeek = (tasks: Task[]): Task[] => {
  const today = new Date();
  const weekEnd = new Date(today);
  weekEnd.setDate(today.getDate() + 7);

  return tasks.filter((task) => {
    const taskDate = new Date(task.dueDate);
    return taskDate >= today && taskDate <= weekEnd;
  });
};

export const getWeeklyCompletionPercentage = (tasks: Task[]): number => {
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.isCompleted).length;
  return totalTasks === 0 ? 0 : (completedTasks / totalTasks) * 100;
};
