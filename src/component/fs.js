// Container
export const compare = (key) => (a, b) =>
  a[key] < b[key] ? 1 : a[key] > b[key] ? -1 : 0;

export const filter = (f, iter) => {
  const arr = [];
  for (const a of iter) {
    if (f(a)) {
      arr.push(a);
    }
  }
  return arr;
};
export const parseAndSet = (setFunc, dataName) => {
  const pasredTodoDatum = JSON.parse(dataName);
  setFunc(pasredTodoDatum);
};

// CompletedList, todoDateRow
export const makeDate = (date) => {
  const dateObj = new Date(date);
  const YEAR = dateObj.getFullYear();
  const MONTH = dateObj.getMonth() + 1;
  const DAY = dateObj.getDate();

  return { year: YEAR, month: MONTH, day: DAY };
};

export const log = console.log;
