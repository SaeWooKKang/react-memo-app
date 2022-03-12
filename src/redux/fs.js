export const saveData = (name, todoDatum) => {
  localStorage.setItem(name, JSON.stringify(todoDatum));
};