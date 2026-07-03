/**
 * calendar.js
 * Pure utility functions for calendar data generation.
 * No React, no DOM — only native JavaScript Date.
 */

const MONTH_NAMES = [
  'January', 'February', 'March', 'April',
  'May', 'June', 'July', 'August',
  'September', 'October', 'November', 'December',
];

/**
 * Returns the full month name for a given month index (0-based).
 * @param {number} month - Month index (0 = January, 11 = December).
 * @returns {string}
 */
export function getMonthName(month) {
  return MONTH_NAMES[month];
}

/**
 * Returns the total number of days in a given month.
 * @param {number} year
 * @param {number} month - Month index (0-based).
 * @returns {number}
 */
export function getDaysInMonth(year, month) {
  // Day 0 of the next month is the last day of the current month.
  return new Date(year, month + 1, 0).getDate();
}

/**
 * Returns the weekday index (0 = Sunday) of the first day of a given month.
 * @param {number} year
 * @param {number} month - Month index (0-based).
 * @returns {number}
 */
export function getFirstDayOfMonth(year, month) {
  return new Date(year, month, 1).getDay();
}

/**
 * Builds an ordered flat array of cell descriptors for a calendar grid.
 * Leading empty cells are inserted so that day 1 appears under the correct
 * weekday column (Sunday = column 0).
 *
 * @param {number} year
 * @param {number} month - Month index (0-based).
 * @returns {Array<{ key: string, day: number|null, isEmpty: boolean }>}
 */
export function buildCalendarCells(year, month) {
  const firstDayOfWeek = getFirstDayOfMonth(year, month);
  const totalDays = getDaysInMonth(year, month);

  const cells = [];

  // Leading empty cells
  for (let i = 0; i < firstDayOfWeek; i++) {
    cells.push({ key: `empty-${i}`, day: null, isEmpty: true });
  }

  // One cell per day of the month
  for (let day = 1; day <= totalDays; day++) {
    cells.push({ key: `day-${day}`, day, isEmpty: false });
  }

  return cells;
}
