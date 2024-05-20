import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import duration from 'dayjs/plugin/duration';
dayjs.extend(relativeTime);
dayjs.extend(duration);

// Define an interface for the return type
export interface TimeDiff {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export const replenish = (v: number) => (v < 10 ? '0' + v : v);

// Function to calculate the time difference between now and the future time represented by the input seconds
export function calculateTimeDiff(seconds: number): TimeDiff {
  // Get the current time
  const future = dayjs(seconds);
  // Set the future time by adding the input seconds to the current time
  const now = dayjs();

  // Calculate the difference between the future time and now
  const diff = future.diff(now);

  // Convert the difference into days, hours, minutes, and seconds
  const diffDays = dayjs.duration(diff).days();
  const diffHours = dayjs.duration(diff).hours();
  const diffMinutes = dayjs.duration(diff).minutes();
  const diffSeconds = dayjs.duration(diff).seconds();

  // Return the time difference as an object
  return {
    days: diffDays,
    hours: diffHours,
    minutes: diffMinutes,
    seconds: diffSeconds,
  };
}

// doc: https://day.js.org/docs/en/display/from-now
export const timeToNow = (timestamp: number) => {
  return dayjs(new Date(timestamp * 1000).toLocaleString()).fromNow(true);
};

export function timeFormat(timestamp: number, regex: string): string;
export function timeFormat(timestamp: number): string;
export function timeFormat(timestamp: number, regex = 'YYYY/MM/DD HH:mm:ss A') {
  return dayjs(new Date(timestamp * 1000)).format(regex);
}
export function beforeDay(): Date {
  let currentDate = new Date();
  currentDate.setDate(currentDate.getDate() - 1);
  return currentDate;
}

export function dateToMilliseconds(date: Date): number {
  let milliseconds = dayjs(date).valueOf();
  return milliseconds;
}

export function dateToSeconds(date: Date): number {
  return Math.floor(dateToMilliseconds(date) / 1000);
}

export function secondsToMilliseconds(date: number): number {
  if (('' + date).length === 10) {
    return Math.floor(date * 1000);
  }
  return date;
}
