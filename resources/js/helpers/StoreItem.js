class StoreItem {
  data;
  error;
  loading;
  pristine;
  constructor(data = null, error = null, loading = false, pristine = true) {
    this.data = data;
    this.error = error;
    this.loading = loading;
    this.pristine = pristine;
  }
}

export default StoreItem;
