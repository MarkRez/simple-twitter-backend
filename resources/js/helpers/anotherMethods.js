export const clearObject = (obj) => {
  Object.keys(obj).forEach(key => (obj[key] == null || !obj[key]) && delete obj[key]);
}
