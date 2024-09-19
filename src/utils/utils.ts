import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isoWeek from "dayjs/plugin/isoWeek";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import { Task } from "@deps/models/types";

dayjs.extend(isoWeek);
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

// Get tasks due today
export const getTasksForToday = (tasks: Task[]): Task[] => {
  const today = dayjs().startOf("day"); // Start of today (removes time part)
  return tasks.filter((task) => dayjs(task.dueDate).isSame(today, "day"));
};

export const getTasksForWeek = (tasks: Task[]): Task[] => {
  const startOfWeek = dayjs().startOf("isoWeek"); // Monday of the current week
  const endOfWeek = dayjs().endOf("isoWeek"); // Sunday of the current week

  return tasks.filter((task) => {
    const taskDate = dayjs(task.dueDate).startOf("day");
    return (
      taskDate.isSameOrAfter(startOfWeek) && taskDate.isSameOrBefore(endOfWeek)
    );
  });
};

// Get tasks due this month
export const getTasksForMonth = (tasks: Task[]): Task[] => {
  const currentMonth = dayjs().month(); // Current month (0-indexed)
  const currentYear = dayjs().year(); // Current year

  return tasks.filter((task) => {
    const taskDate = dayjs(task.dueDate);
    return taskDate.month() === currentMonth && taskDate.year() === currentYear;
  });
};

// Get the percentage of tasks completed this week
export const getWeeklyCompletionPercentage = (tasks: Task[]): number => {
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.isCompleted).length;
  return totalTasks === 0 ? 0 : (completedTasks / totalTasks) * 100;
};
