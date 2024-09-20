import { Person, Task } from "@deps/models/types";
import {
  getTasksForMonth,
  getTasksForToday,
  getTasksForWeek,
  getWeeklyCompletionPercentage,
} from "@deps/utils/utils";
import dayjs from "dayjs";
import { TypographyVariant } from "../typography/typography";
import Typography from "../typography/typography";

interface TaskCollectionProps {
  people: Person[];
}

const TaskCollection = ({ people }: TaskCollectionProps) => {
  // Flatten all tasks and events and associate them with their respective person
  const allTasks = people.flatMap((person) =>
    person.tasks.map((task) => ({ ...task, personName: person.name }))
  );

  const todayTasks = getTasksForToday(allTasks);
  const weekTasks = getTasksForWeek(allTasks);
  const monthTasks = getTasksForMonth(allTasks); // Get monthly tasks
  const completionPercentage = getWeeklyCompletionPercentage(weekTasks);

  // Group tasks and events by date
  const tasksByDate = monthTasks.reduce((acc: Record<string, Task[]>, task) => {
    const dateKey = dayjs(task.dueDate).format("YYYY-MM-DD");
    if (!acc[dateKey]) {
      acc[dateKey] = [];
    }
    acc[dateKey].push(task);
    return acc;
  }, {});

  return (
    <>
      <Typography variant={TypographyVariant.H3}>
        Daily, Weekly, and Monthly Tasks
      </Typography>

      <div className="flex flex-row gap-10 mb-4">
        {/* Daily Breakdown */}
        <div>
          <h2>Tasks Assigned for Today</h2>
          {todayTasks.length > 0 ? (
            <ul className="list-disc">
              {todayTasks.map((task) => (
                <li key={task.id} className="mb-2">
                  {task.title} - {dayjs(task.dueDate).format("MMM D")} (
                  {task.personName})
                </li>
              ))}
            </ul>
          ) : (
            <p>No tasks for today.</p>
          )}
        </div>

        {/* Weekly Breakdown */}
        <div>
          <h2>Tasks for This Week</h2>
          {weekTasks.length > 0 ? (
            <ul className="list-disc">
              {weekTasks.map((task) => (
                <li key={task.id} className="mb-2">
                  {task.title} - {dayjs(task.dueDate).format("MMM D")} (
                  {task.personName})
                </li>
              ))}
            </ul>
          ) : (
            <p>No tasks for this week.</p>
          )}
        </div>
      </div>
      <h3>Weekly Completion Percentage: {completionPercentage}%</h3>
    </>
  );
};

export default TaskCollection;
