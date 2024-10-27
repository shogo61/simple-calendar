import React, { useState } from "react";
import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  isSameDay,
  isSameMonth,
  format,
  addMonths,
} from "date-fns";
import { css, cva } from "../styled-system/css";

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const renderHeader = () => {
    return (
      <div className={styles.header}>
        <button
          onClick={() =>
            setCurrentDate(startOfMonth(addMonths(currentDate, -1)))
          }
          className={styles.button}
        >
          Prev
        </button>
        <h2 className={styles.title}>{format(currentDate, "MM yyyy")}</h2>
        <button
          onClick={() =>
            setCurrentDate(startOfMonth(addMonths(currentDate, 1)))
          }
          className={styles.button}
        >
          Next
        </button>
      </div>
    );
  };

  const renderDays = () => {
    const days = [];
    let startDate = startOfWeek(startOfMonth(currentDate), { weekStartsOn: 1 });
    let endDate = endOfWeek(endOfMonth(currentDate), { weekStartsOn: 1 });

    while (startDate <= endDate) {
      days.push(
        <div
          className={styles.day({
            isCurrentMonth: isSameMonth(startDate, currentDate),
          })}
          key={startDate.getTime()}
        >
          {format(startDate, "d")}
        </div>
      );
      startDate = addDays(startDate, 1);
    }

    return <div className={styles.days}>{days}</div>;
  };

  return (
    <div className={styles.calendar}>
      {renderHeader()}
      {renderDays()}
    </div>
  );
};

const styles = {
  calendar: css({
    border: "none",
    borderRadius: "10px",
    width: "350px",
    boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
    backgroundColor: "#fff",
  }),
  header: css({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px",
    borderBottom: "1px solid #eee",
  }),
  title: css({
    margin: "0",
    fontSize: "1.2rem",
    fontWeight: "bold",
  }),
  button: css({
    padding: "8px 12px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    backgroundColor: "#f0f0f0",
    color: "#333",
    transition: "background-color 0.3s ease",
    "&:hover": {
      backgroundColor: "#ddd",
    },
  }),
  days: css({
    display: "grid",
    gridTemplateColumns: "repeat(7, 1fr)",
  }),
  day: cva({
    base: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "calc(100% / 7)",
      padding: "12px",
      border: "none",
      borderBottom: "1px solid #eee",
      cursor: "pointer",
      transition: "background-color 0.3s ease",
      "&:hover": {
        backgroundColor: "#f5f5f5",
      },
    },
    variants: {
      isCurrentMonth: {
        false: { color: "#aaa" },
      },
    },
  }),
};

export default Calendar;
