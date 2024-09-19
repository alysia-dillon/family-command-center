import { Person } from "@deps/models/types";
import dayjs from "dayjs";

interface EventCalendarProps {
  people: Person[];
}

const EventCalendar = ({ people }: EventCalendarProps) => {
  const currentMonth = dayjs().month(); // Get the current month
  const currentYear = dayjs().year(); // Get the current year

  // Create an array of days for the current month
  const daysInMonth = dayjs().daysInMonth();
  const firstDayOfMonth = dayjs().startOf("month").day(); // Get the day of the week for the first day

  const allEvents = people.flatMap((person) =>
    person.events.map((event) => ({ ...event, personName: person.name }))
  );

  const eventsByDate = allEvents.reduce(
    (acc: Record<string, Event[]>, event) => {
      const dateKey = dayjs(event.date).format("YYYY-MM-DD");
      if (!acc[dateKey]) {
        acc[dateKey] = [];
      }
      acc[dateKey].push(event);
      return acc;
    },
    {}
  );

  const renderCalendar = () => {
    const calendarDays = [];
    const blankDays = Array.from({ length: firstDayOfMonth }, (_, i) => i); // Create blank slots for days before the first day of the month

    for (let day = 1; day <= daysInMonth; day++) {
      const dateKey = dayjs(`${currentYear}-${currentMonth + 1}-${day}`).format(
        "YYYY-MM-DD"
      );
      const eventsForDay = eventsByDate[dateKey] || [];
      calendarDays.push(
        <div key={day} className="p-2 border border-gray-300">
          <span className="font-bold">{day}</span>
          <ul className="list-disc">
            {eventsForDay.map((event) => (
              <li key={event.id} className="text-xs">
                {event.title} ({event.personName})
              </li>
            ))}
          </ul>
        </div>
      );
    }

    return [
      ...blankDays.map((index) => <div key={index} className="p-2" />),
      ...calendarDays,
    ]; // Prepend blank slots before the first day
  };

  return (
    <div className="mb-8">
      <h2>Calendar View of Events</h2>
      <div className="grid grid-cols-7 gap-1">
        {/* Render Day Headers */}
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} className="font-bold p-2 border border-gray-300">
            {day}
          </div>
        ))}

        {/* Render Calendar Days */}
        {renderCalendar()}
      </div>
    </div>
  );
};

export default EventCalendar;
