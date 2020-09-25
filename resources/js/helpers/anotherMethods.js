export const cleanObject = (obj) => Object.keys(obj)
  .filter((key) => !!obj[key])
  .reduce((prev, current, cu) => {
    prev[current] = obj[current];
    return prev;
  }, {})

export const cropText = (text) => {
  if (text.length <= 500) {
    return text;
  } else {
    return `${text.slice(0, 500)} ...`
  }
};

export const handleImageError = (e) => {
  e.target.src = '/storage/avatars/default.jpg';
}
