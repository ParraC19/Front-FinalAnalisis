import React, { useEffect, useState } from "react";

function ActualDate() {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(new Date());
    }, 1000); // cada segundo

    return () => clearInterval(interval); // cleanup
  }, []);

  const time = now.toLocaleTimeString("es-CO", {
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
});

const date = now.toLocaleDateString("es-CO", {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
});
  return (
    <div className="h-full flex justify-end items-end text-white">
      <h1 className="text-md text-end">
        {time} <br></br>
        <span>{date}</span>
      </h1>
    </div>
  );
}

export default ActualDate;
