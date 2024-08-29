import { useState } from "react";
import { useStore } from "@deps/store/store"; // Assuming store is set up as described earlier
import { Person, Task } from "@deps/models/types"; // Assuming types are stored in a 'types.ts' file
import Link from "next/link";

const SettingsPage = () => {
  const { people, addPerson, addTask } = useStore();
  const [newPersonName, setNewPersonName] = useState("");
  const [selectedPersonId, setSelectedPersonId] = useState<string | null>(null);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskDueDate, setNewTaskDueDate] = useState("");

  const handleAddPerson = () => {
    if (newPersonName.trim()) {
      addPerson(newPersonName.trim());
      setNewPersonName("");
    }
  };

  const handleAddTask = () => {
    if (selectedPersonId && newTaskTitle.trim() && newTaskDueDate) {
      const task = {
        title: newTaskTitle.trim(),
        isCompleted: false,
        dueDate: new Date(newTaskDueDate),
      };
      addTask(selectedPersonId, task);
      setNewTaskTitle("");
      setNewTaskDueDate("");
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">Settings</h1>

      {/* Add Person Section */}
      <div className="mb-8">
        <h2 className="text-xl mb-2">Add a New Person</h2>
        <input
          type="text"
          value={newPersonName}
          onChange={(e) => setNewPersonName(e.target.value)}
          placeholder="Enter name"
          className="border p-2 mb-2"
        />
        <button
          onClick={handleAddPerson}
          className="bg-blue-500 text-white p-2"
        >
          Add Person
        </button>
      </div>

      {/* Add Task Section */}
      <div className="mb-8">
        <h2 className="text-xl mb-2">Add a New Task</h2>
        <select
          value={selectedPersonId || ""}
          onChange={(e) => setSelectedPersonId(e.target.value)}
          className="border p-2 mb-2"
        >
          <option value="" disabled>
            Select Person
          </option>
          {people.map((person) => (
            <option key={person.id} value={person.id}>
              {person.name}
            </option>
          ))}
        </select>
        <input
          type="text"
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          placeholder="Enter task title"
          className="border p-2 mb-2"
        />
        <input
          type="date"
          value={newTaskDueDate}
          onChange={(e) => setNewTaskDueDate(e.target.value)}
          className="border p-2 mb-2"
        />
        <button onClick={handleAddTask} className="bg-green-500 text-white p-2">
          Add Task
        </button>
      </div>

      {/* People and Tasks Overview */}
      <div>
        <h2 className="text-xl mb-2">People and Tasks Overview</h2>
        {people.map((person) => (
          <div key={person.id} className="mb-4">
            <h3 className="text-lg mb-2">
              <Link href={`/person/${person.id}`}>{person.name}</Link>
            </h3>
            <ul>
              {person.tasks.map((task) => (
                <li key={task.id} className="mb-1">
                  {task.title} (Due: {task.dueDate.toDateString()}) -{" "}
                  {task.isCompleted ? "Completed" : "Pending"}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SettingsPage;
