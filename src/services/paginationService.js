export class Paginator {
  constructor(arrLength, interval = 5, first = 0) {
    this._arrLength = arrLength;
    this._interval = +interval;
    this._first = +first;
  }

  get interval() {
    return this._interval;
  }

  get first() {
    return this._first;
  }

  get last() {
    if (this._first < 0 || this._interval < 0) {
      throw new Error('Please choose valid value');
    }
    if (this._first + this._interval >= this._arrLength) {
      return this._arrLength;
    }
    return this._first + this._interval;
  }

  restart(newInterval) {
    this._first = 0;
    this._interval = +newInterval;
    return this.last;
  }

  next() {
    if (this._first + this._interval >= this._arrLength) {
      return;
    }
    this._first += this._interval;
  }

  back() {
    if (this._first - this._interval <= 0) {
      this._first = 0;
      return;
    }
    this._first -= this._interval;
  }
}
