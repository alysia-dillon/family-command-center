import EventCalendar from "@deps/components/eventCalendar/EventCalendar";
import TaskCollection from "@deps/components/taskCollection/TaskCollection";
import TodayWidget from "@deps/components/todayWidget/TodayWidget";
import { useStore } from "@deps/store/store";

const HomePage = () => {
  const { people } = useStore();

  return (
    <div>
      <TodayWidget />
      <TaskCollection people={people} />
      <EventCalendar people={people} />
    </div>
  );
};

export default HomePage;
