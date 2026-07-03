import { useState, useEffect } from 'react';
import './Calendar.css';
import CalendarDay from '../CalendarDay/CalendarDay';
import { getMonthName, buildCalendarCells } from '../../utils/calendar';

const WEEKDAY_HEADERS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [checkedDates, setCheckedDates] = useState(() => {
    try {
      const stored = localStorage.getItem('calendar-ticker');
      return stored ? new Set(JSON.parse(stored)) : new Set();
    } catch {
      return new Set();
    }
  });

  useEffect(() => {
    localStorage.setItem('calendar-ticker', JSON.stringify([...checkedDates]));
  }, [checkedDates]);

  const year      = currentDate.getFullYear();
  const month     = currentDate.getMonth();

  // Track today independently so isToday is always accurate
  const today     = new Date();
  const todayDate = today.getDate();
  const isCurrentMonth =
    today.getFullYear() === year && today.getMonth() === month;

  const cells = buildCalendarCells(year, month);

  function goToPrevMonth() {
    setCurrentDate((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  }

  function goToNextMonth() {
    setCurrentDate((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  }

  function handleDayClick(day) {
    const dateKey = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    setCheckedDates((prev) => {
      const next = new Set(prev);
      if (next.has(dateKey)) {
        next.delete(dateKey);
      } else {
        next.add(dateKey);
      }
      return next;
    });
  }

  return (
    <section className="calendar">
      <div className="calendar__nav">
        <button
          className="calendar__nav-btn"
          onClick={goToPrevMonth}
          aria-label="Previous month"
        >
          &#9664;
        </button>

        <h2 className="calendar__heading">
          {getMonthName(month)} {year}
        </h2>

        <button
          className="calendar__nav-btn"
          onClick={goToNextMonth}
          aria-label="Next month"
        >
          &#9654;
        </button>
      </div>

      <div className="calendar__grid">
        {/* Weekday header row */}
        {WEEKDAY_HEADERS.map((label) => (
          <div key={label} className="calendar__weekday">
            {label}
          </div>
        ))}

        {/* Day cells */}
        {cells.map(({ key, day, isEmpty }) => {
          const dateKey = isEmpty
            ? null
            : `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
          return (
            <CalendarDay
              key={key}
              day={day}
              isEmpty={isEmpty}
              isToday={isCurrentMonth && !isEmpty && day === todayDate}
              isChecked={dateKey !== null && checkedDates.has(dateKey)}
              onClick={isEmpty ? null : () => handleDayClick(day)}
            />
          );
        })}
      </div>
    </section>
  );
}

export default Calendar;
