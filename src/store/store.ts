import create from "zustand";
import { v4 as uuidv4 } from "uuid";
import { Event, Person, Task } from "@deps/models/types";

type State = {
  people: Person[];
  addPerson: (name: string) => void;
  addTask: (personId: string, task: Omit<Task, "id">) => void;
  addEvent: (personId: string, event: Omit<Event, "id">) => void;
  toggleTaskCompletion: (personId: string, taskId: string) => void;
  editTask: (
    personId: string,
    taskId: string,
    updatedTask: Omit<Task, "id">
  ) => void;
  editEvent: (
    personId: string,
    eventId: string,
    updatedEvent: Omit<Event, "id">
  ) => void;
  deleteTask: (personId: string, taskId: string) => void;
  deleteEvent: (personId: string, eventId: string) => void;
};

export const useStore = create<State>((set) => ({
  people: [],
  addPerson: (name: string) =>
    set((state) => ({
      people: [...state.people, { id: uuidv4(), name, tasks: [], events: [] }],
    })),
  addTask: (personId, task) =>
    set((state) => ({
      people: state.people.map((person) =>
        person.id === personId
          ? { ...person, tasks: [...person.tasks, { ...task, id: uuidv4() }] }
          : person
      ),
    })),
  addEvent: (personId, event) =>
    set((state) => ({
      people: state.people.map((person) =>
        person.id === personId
          ? {
              ...person,
              events: [...person.events, { ...event, id: uuidv4() }],
            }
          : person
      ),
    })),
  toggleTaskCompletion: (personId, taskId) =>
    set((state) => ({
      people: state.people.map((person) =>
        person.id === personId
          ? {
              ...person,
              tasks: person.tasks.map((task) =>
                task.id === taskId
                  ? { ...task, isCompleted: !task.isCompleted }
                  : task
              ),
            }
          : person
      ),
    })),
  editTask: (personId, taskId, updatedTask) =>
    set((state) => ({
      people: state.people.map((person) =>
        person.id === personId
          ? {
              ...person,
              tasks: person.tasks.map((task) =>
                task.id === taskId ? { ...updatedTask, id: taskId } : task
              ),
            }
          : person
      ),
    })),
  editEvent: (personId, eventId, updatedEvent) =>
    set((state) => ({
      people: state.people.map((person) =>
        person.id === personId
          ? {
              ...person,
              events: person.events.map((event) =>
                event.id === eventId ? { ...updatedEvent, id: eventId } : event
              ),
            }
          : person
      ),
    })),
  deleteTask: (personId, taskId) =>
    set((state) => ({
      people: state.people.map((person) =>
        person.id === personId
          ? {
              ...person,
              tasks: person.tasks.filter((task) => task.id !== taskId),
            }
          : person
      ),
    })),
  deleteEvent: (personId, eventId) =>
    set((state) => ({
      people: state.people.map((person) =>
        person.id === personId
          ? {
              ...person,
              events: person.events.filter((event) => event.id !== eventId),
            }
          : person
      ),
    })),
}));
