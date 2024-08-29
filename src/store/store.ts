import create from "zustand";
import { v4 as uuidv4 } from "uuid";
import { Person, Task } from "@deps/models/types";

type State = {
  people: Person[];
  addPerson: (name: string) => void;
  addTask: (personId: string, task: Omit<Task, "id">) => void;
  toggleTaskCompletion: (personId: string, taskId: string) => void;
};

export const useStore = create<State>((set) => ({
  people: [],
  addPerson: (name: string) =>
    set((state) => ({
      people: [...state.people, { id: uuidv4(), name, tasks: [] }],
    })),
  addTask: (personId, task) =>
    set((state) => ({
      people: state.people.map((person) =>
        person.id === personId
          ? { ...person, tasks: [...person.tasks, { ...task, id: uuidv4() }] }
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
}));
