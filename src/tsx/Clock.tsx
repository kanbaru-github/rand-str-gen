import React, { useEffect, useState } from "react";

export const Clock: React.FC = () => {
  const [date, setDate] = useState(new Date());
  const [is12HourFormat, setIs12HourFormat] = useState(true);

  const formatter = new Intl.DateTimeFormat("ja-JP", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: is12HourFormat,
  });

  const time = formatter.format(date);

  useEffect(() => {
    setInterval(() => {
      setDate(new Date());
    }, 1000);
  }, [date, is12HourFormat]);

  const handleSwitchFormat = () => {
    setIs12HourFormat((prevState) => !prevState);
  }

  return (
    <section>
      <div>
        <span>{time}</span>
      </div>

      <button onClick={handleSwitchFormat}>
        Switch
      </button>
    </section>
  )
}
