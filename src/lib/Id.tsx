let id = 0;

class Id {
  value: number;

  // startFrom10000() {
  //   return this.value + 10000;
  // }

  constructor() {
    id += 1;
    this.value = id;
  }
}

export {Id};