const dateToString = (data) => {
  let date = new Date(data);
  return (
    date.getHours() +
    ":" +
    date.getMinutes() +
    ":" +
    date.getSeconds() +
    " " +
    date.getDate() +
    "/" +
    (date.getMonth() + 1) +
    "/" +
    date.getFullYear()
  );
};
const timeToString = (data) => {
  let date = new Date(data);
  return date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
};

const SortTimeToString = (data) => {
  let date = new Date(data);
  return date.getHours() + ":" + date.getMinutes();
};
export { dateToString, timeToString, SortTimeToString };
