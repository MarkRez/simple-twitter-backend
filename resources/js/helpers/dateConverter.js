const months = [ "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December" ];

export const prettyDate = (dateSql, withTime = false) => {
  let result = '';
  const currentDate = new Date();
  const date = new Date(dateSql);
  const monthDay = `${months[date.getMonth()]} ${date.getDate()}`;

  if (currentDate.getFullYear() === date.getFullYear()) {
    result =  monthDay;
  } else {
    result = `${monthDay}, ${date.getFullYear()}`
  }

  if (withTime) {
    result = `${addZeros(date.getHours())}:${addZeros(date.getMinutes())} · ${result}`;
  }

  return result;
};

const addZeros = (number) => {
  if (number >= 10) {
    return number
  } else {
    return `0${number}`
  }
};
