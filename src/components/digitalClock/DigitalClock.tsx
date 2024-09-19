import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import "dayjs/locale/en-gb";

const DigitalClock: React.FC = () => {
  const [time, setTime] = useState<string>(dayjs().format("hh:mm"));

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(dayjs().format("hh:mm:ss"));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formattedTime = dayjs().format("hh:mm");
  const seconds = dayjs().format("ss");
  const amPm = dayjs().format("A");

  return (
    <div className="flex items-center space-x-2">
      <h1 className="text-3xl font-bold">{formattedTime}</h1>
      <span className="text-xl text-gray-400">
        <sup>{seconds}</sup>
      </span>
      <span className="text-sm font-normal text-gray-600 ml-1">{amPm}</span>
    </div>
  );
};

export default DigitalClock;
