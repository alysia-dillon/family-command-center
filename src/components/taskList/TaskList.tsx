import { useStore } from "@deps/store/store";

const TaskList = ({ personId }: { personId: string }) => {
  const { people, toggleTaskCompletion } = useStore();
  const person = people.find((p) => p.id === personId);

  if (!person) return null;

  return (
    <ul>
      {person.tasks.map((task) => (
        <li key={task.id} className="flex items-center mb-2">
          <input
            type="checkbox"
            checked={task.isCompleted}
            onChange={() => toggleTaskCompletion(personId, task.id)}
          />
          <p
            className={`ml-2 ${
              task.isCompleted ? "decoration-solid line-through " : ""
            }`}
          >
            {task.title}
          </p>
        </li>
      ))}
    </ul>
  );
};

export default TaskList;
