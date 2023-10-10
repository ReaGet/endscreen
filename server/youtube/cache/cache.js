export class Cache {
  constructor() {
    this.data = new Map();
  }

  has(key) {
    return this.data.has(key);
  }

  set(key, value) {
    this.data.set(key, value);
  }

  get(key) {
    if (!this.has(key)) {
      return null;
    }
    return this.data.get(key);
  }

  remove(key) {
    this.data.delete(key);
  }

  reset() {
    this.data.clear();
  }
}