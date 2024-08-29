import { useStore } from "@deps/store/store";

const TaskList = ({ personId }: { personId: string }) => {
  const { people, toggleTaskCompletion } = useStore();
  const person = people.find((p) => p.id === personId);

  if (!person) return null;

  return (
    <ul>
      {person.tasks.map((task) => (
        <li key={task.id}>
          <input
            type="checkbox"
            checked={task.isCompleted}
            onChange={() => toggleTaskCompletion(personId, task.id)}
          />
          {task.title}
        </li>
      ))}
    </ul>
  );
};

export default TaskList;
