import Typography, { TypographyVariant } from "../typography/typography";
import dayjs from "dayjs";
import weekday from "dayjs/plugin/weekday"; // Import weekday plugin
import advancedFormat from "dayjs/plugin/advancedFormat"; // Import advancedFormat plugin
import DigitalClock from "../digitalClock/DigitalClock";

dayjs.extend(weekday); // Use weekday plugin
dayjs.extend(advancedFormat); // Use advancedFormat plugin

const TodayWidget = () => {
  const formattedDate = dayjs().format("dddd, MMMM D, YYYY");
  return (
    <>
      <DigitalClock />
      <Typography variant={TypographyVariant.H4}>{formattedDate}</Typography>
    </>
  );
};

export default TodayWidget;
