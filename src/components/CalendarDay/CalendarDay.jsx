import './CalendarDay.css';

function CalendarDay({ day = null, isToday = false, isEmpty = false, isChecked = false, onClick = null }) {
  const classNames = [
    'calendar-day',
    isToday   ? 'calendar-day--today'   : '',
    isEmpty   ? 'calendar-day--empty'   : '',
    isChecked ? 'calendar-day--checked' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classNames} onClick={isEmpty ? undefined : onClick}>
      {!isEmpty && day}
    </div>
  );
}

export default CalendarDay;
