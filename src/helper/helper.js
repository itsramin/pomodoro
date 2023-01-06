export const dateFormat = (date) => {
  return new Date(date).toISOString().slice(0, 10);
};
