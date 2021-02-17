export const makeDateStringTime = (t, day = 0) => {
  let date = new Date(t);

  day !== 0 && date.setDate(date.getDate() + day);

  return new Date(date.toDateString()).getTime();
};
