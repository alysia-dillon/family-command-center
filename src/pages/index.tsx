import { useStore } from "@deps/store/store";
import {
  getTasksForToday,
  getTasksForWeek,
  getWeeklyCompletionPercentage,
} from "@deps/utils/utils";

const HomePage = () => {
  const { people } = useStore();

  // Flatten all tasks and associate them with their respective person
  const allTasks = people.flatMap((person) =>
    person.tasks.map((task) => ({ ...task, personName: person.name }))
  );

  const todayTasks = getTasksForToday(allTasks);
  const weekTasks = getTasksForWeek(allTasks);
  const completionPercentage = getWeeklyCompletionPercentage(weekTasks);

  return (
    <div>
      <h1>Tasks Assigned for Today</h1>
      <ul>
        {todayTasks.map((task) => (
          <li key={task.id}>
            {task.title} | Assigned to: {task.personName}
          </li>
        ))}
      </ul>

      <h2>Tasks for This Week</h2>
      <ul>
        {weekTasks.map((task) => (
          <li key={task.id}>
            {task.title} | Assigned to: {task.personName}
          </li>
        ))}
      </ul>

      <h3>Weekly Completion Percentage: {completionPercentage}%</h3>
    </div>
  );
};

export default HomePage;
