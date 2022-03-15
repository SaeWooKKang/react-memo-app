import { curry, go, each } from 'fxjs';
import { put } from '../redux/reducers/memoSlice';

export const compare = (key) => (a, b) =>
  a[key] < b[key] ? 1 : a[key] > b[key] ? -1 : 0;

// CompletedList, todoDateRow
export const makeDate = date => {
  const dateObj = new Date(date);
  const YEAR = dateObj.getFullYear();
  const MONTH = dateObj.getMonth() + 1;
  const DAY = dateObj.getDate();

  return { year: YEAR, month: MONTH, day: DAY };
};

export const saveData = curry((name, todoDatum) => {
  localStorage.setItem(name, JSON.stringify(todoDatum));
});


