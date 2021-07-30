export const format = (date) => {
  let year = date.getFullYear();
  let month = date.getMonth() + 1; // because the first month has 0 index
  let day = date.getDate();

  // convert into string
  month = String(month);

  month = month.length === 1 ? "0" + month : month;
  day = day.length === 1 ? "0" + day : day;

  const fullDate = `${year}-${month}-${day}`;

  return fullDate;
};
