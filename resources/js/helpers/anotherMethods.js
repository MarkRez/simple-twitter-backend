export const cleanObject = (obj) => Object.keys(obj)
  .filter((key) => !!obj[key])
  .reduce((prev, current, cu) => {
    prev[current] = obj[current];
    return prev;
  }, {})
