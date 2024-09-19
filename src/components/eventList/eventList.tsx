import { useStore } from "@deps/store/store";
import dayjs from "dayjs";

const EventList = ({ personId }: { personId: string }) => {
  const { people } = useStore();
  const person = people.find((p) => p.id === personId);

  if (!person) return null;

  return (
    <ul>
      {person.events.map((event) => (
        <li key={event.id} className="flex items-center mb-2">
          {event.title} (Date: {dayjs(event.date).format("MMM D, YYYY")})
        </li>
      ))}
    </ul>
  );
};

export default EventList;
