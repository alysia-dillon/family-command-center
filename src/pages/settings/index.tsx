import React, { useState } from "react";
import { useStore } from "@deps/store/store";
import { Person, Task, Event } from "@deps/models/types";
import Link from "next/link";
import { toSentenceCase } from "@deps/helpers/string.helper";
import dayjs from "dayjs";

const SettingsPage = () => {
  const {
    people,
    addPerson,
    addTask,
    addEvent,
    editTask,
    deleteTask,
    editEvent,
    deleteEvent,
  } = useStore();
  const [newPersonName, setNewPersonName] = useState("");
  const [selectedPersonId, setSelectedPersonId] = useState<string | null>(null);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskDueDate, setNewTaskDueDate] = useState("");
  const [newEventTitle, setNewEventTitle] = useState("");
  const [newEventDate, setNewEventDate] = useState("");

  // Editing state
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  const [editingEventId, setEditingEventId] = useState<string | null>(null);
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDueDate, setTaskDueDate] = useState("");
  const [eventTitle, setEventTitle] = useState("");
  const [eventDate, setEventDate] = useState("");

  const handleAddPerson = () => {
    if (newPersonName.trim()) {
      addPerson(newPersonName.trim());
      setNewPersonName("");
    }
  };

  const handleAddTask = () => {
    if (selectedPersonId && newTaskTitle.trim() && newTaskDueDate) {
      const taskDueDate = dayjs(newTaskDueDate).toDate();
      const task = {
        title: newTaskTitle.trim(),
        isCompleted: false,
        dueDate: taskDueDate,
      };
      addTask(selectedPersonId, task);
      setNewTaskTitle("");
      setNewTaskDueDate("");
    }
  };

  const handleAddEvent = () => {
    if (selectedPersonId && newEventTitle.trim() && newEventDate) {
      const eventDate = dayjs(newEventDate).toDate();
      const event = {
        title: newEventTitle.trim(),
        date: eventDate,
      };
      addEvent(selectedPersonId, event);
      setNewEventTitle("");
      setNewEventDate("");
    }
  };

  const handleEditTask = () => {
    if (selectedPersonId && editingTaskId && taskTitle.trim() && taskDueDate) {
      const updatedTask = {
        title: taskTitle.trim(),
        dueDate: dayjs(taskDueDate).toDate(),
      };
      editTask(selectedPersonId, editingTaskId, updatedTask);
      setEditingTaskId(null);
      setTaskTitle("");
      setTaskDueDate("");
    }
  };

  const handleEditEvent = () => {
    if (selectedPersonId && editingEventId && eventTitle.trim() && eventDate) {
      const updatedEvent = {
        title: eventTitle.trim(),
        date: dayjs(eventDate).toDate(),
      };
      editEvent(selectedPersonId, editingEventId, updatedEvent);
      setEditingEventId(null);
      setEventTitle("");
      setEventDate("");
    }
  };

  const handleDeleteTask = (taskId: string) => {
    if (selectedPersonId) {
      deleteTask(selectedPersonId, taskId);
    }
  };

  const handleDeleteEvent = (eventId: string) => {
    if (selectedPersonId) {
      deleteEvent(selectedPersonId, eventId);
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
          placeholder="Task title"
          className="border p-2 mb-2"
        />
        <input
          type="date"
          value={newTaskDueDate}
          onChange={(e) => setNewTaskDueDate(e.target.value)}
          className="border p-2 mb-2"
        />
        <button onClick={handleAddTask} className="bg-blue-500 text-white p-2">
          Add Task
        </button>
      </div>

      {/* Add Event Section */}
      <div className="mb-8">
        <h2 className="text-xl mb-2">Add a New Event</h2>
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
          value={newEventTitle}
          onChange={(e) => setNewEventTitle(e.target.value)}
          placeholder="Event title"
          className="border p-2 mb-2"
        />
        <input
          type="date"
          value={newEventDate}
          onChange={(e) => setNewEventDate(e.target.value)}
          className="border p-2 mb-2"
        />
        <button onClick={handleAddEvent} className="bg-blue-500 text-white p-2">
          Add Event
        </button>
      </div>

      {/* Display and Edit Tasks/Events */}
      {people.map((person) => (
        <div key={person.id} className="mb-8">
          <h2 className="text-xl mb-2">{person.name}</h2>

          {/* Tasks */}
          <div>
            <h3 className="text-lg mb-2">Tasks</h3>
            <ul>
              {person.tasks.map((task) => (
                <li key={task.id} className="mb-2">
                  <span>{task.title}</span>
                  <span className="text-gray-500 ml-2">
                    Due: {dayjs(task.dueDate).format("MMM D")}
                  </span>
                  <button
                    onClick={() => {
                      setEditingTaskId(task.id);
                      setTaskTitle(task.title);
                      setTaskDueDate(dayjs(task.dueDate).format("YYYY-MM-DD"));
                    }}
                    className="text-blue-500 ml-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteTask(task.id)}
                    className="text-red-500 ml-2"
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
            {editingTaskId && (
              <div className="mt-4">
                <h4 className="text-lg mb-2">Edit Task</h4>
                <input
                  type="text"
                  value={taskTitle}
                  onChange={(e) => setTaskTitle(e.target.value)}
                  placeholder="Task title"
                  className="border p-2 mb-2"
                />
                <input
                  type="date"
                  value={taskDueDate}
                  onChange={(e) => setTaskDueDate(e.target.value)}
                  className="border p-2 mb-2"
                />
                <button
                  onClick={handleEditTask}
                  className="bg-green-500 text-white p-2"
                >
                  Save Changes
                </button>
              </div>
            )}
          </div>

          {/* Events */}
          <div>
            <h3 className="text-lg mb-2">Events</h3>
            <ul>
              {person.events.map((event) => (
                <li key={event.id} className="mb-2">
                  <span>{event.title}</span>
                  <span className="text-gray-500 ml-2">
                    Date: {dayjs(event.date).format("MMM D")}
                  </span>
                  <button
                    onClick={() => {
                      setEditingEventId(event.id);
                      setEventTitle(event.title);
                      setEventDate(dayjs(event.date).format("YYYY-MM-DD"));
                    }}
                    className="text-blue-500 ml-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteEvent(event.id)}
                    className="text-red-500 ml-2"
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
            {editingEventId && (
              <div className="mt-4">
                <h4 className="text-lg mb-2">Edit Event</h4>
                <input
                  type="text"
                  value={eventTitle}
                  onChange={(e) => setEventTitle(e.target.value)}
                  placeholder="Event title"
                  className="border p-2 mb-2"
                />
                <input
                  type="date"
                  value={eventDate}
                  onChange={(e) => setEventDate(e.target.value)}
                  className="border p-2 mb-2"
                />
                <button
                  onClick={handleEditEvent}
                  className="bg-green-500 text-white p-2"
                >
                  Save Changes
                </button>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SettingsPage;
