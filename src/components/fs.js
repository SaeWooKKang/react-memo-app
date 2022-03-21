import { curry, go, map, take, join } from 'fxjs';

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

export const saveLocal = curry((name, todoDatum) => {
  localStorage.setItem(name, JSON.stringify(todoDatum));
});

// [2022, 3, 19]
export const dateArr = date => go(
  makeDate(date), // {}
  Object.entries, // [ [], [], [] ]
  map( ([_, v]) => v), // [2022, 3, 19]
);

// 2022.3.19 or 2022.3 or 2022
export const YMD = (date, count) => go(
  dateArr(date),
  take(count), // [2022, 3]
  join('.'), // 2022.3
);

export const array = (...a) => [...a];
export const diffrent = (a, b) => a !== b;
export const push = curry((a, arr) => (arr.push(a), arr));