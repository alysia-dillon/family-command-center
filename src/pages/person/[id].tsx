/* eslint-disable react/no-unescaped-entities */
import { useRouter } from "next/router";
import { useStore } from "@deps/store/store";
import TaskList from "@deps/components/taskList/TaskList"; // Reusable component
import { toSentenceCase } from "@deps/helpers/string.helper";
import EventList from "@deps/components/eventList/eventList";

const PersonTasksPage = () => {
  const router = useRouter();
  const { id } = router.query; // Extract person ID from URL
  const { people } = useStore();

  const person = people.find((p) => p.id === id);

  if (!person) {
    return <div>Person not found.</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">{toSentenceCase(person.name)}'s Tasks</h1>
      <TaskList personId={person.id} />
      <h1 className="text-2xl mb-4">{toSentenceCase(person.name)}'s Events</h1>
      <EventList personId={person.id} />
    </div>
  );
};

export default PersonTasksPage;
