// class basics
class Counter {
  private count: number = 0;
  constructor(initial: number) {
    this.count = initial;
  }

  inc(): this {
    this.count++;
    return this;
  }

  dec(): this {
    this.count--;
    return this;
  }

  value(): number {
    return this.count;
  }
}

let num = new Counter(10);

const result = num.inc().dec().value();
console.log(result); // 10

// 2.Access Modifiers & Private Fields
class Demo {
  public demo1: string = "public";
  #demo2: string = "private";
  protected demo3: string = "protected";

  access() {
    console.log(this.demo1);
    console.log(this.#demo2);
    console.log(this.demo3);
  }
}

const Demo_ = new Demo();
console.log(Demo_);

Demo_.demo1;
// Demo_.#demo2 cant accessed outside the class

// 3. Setters and Getters

class Counter3 {
  private _step: number = 1;
  constructor(private count: number = 0) {
    this.count = count;
  }

  inc(): this {
    this.count += this._step;
    return this;
  }
  dec(): this {
    this.count -= this._step;
    return this;
  }
  value(): number {
    return this.count;
  }

  get isZero(): boolean {
    return this.count === 0;
  }

  set step(n: number) {
    if (n < 0) {
      throw new Error("Step cant be negative");
    }
    this._step = n;
  }
}

const gese = new Counter3(2);
console.log(gese.inc);
console.log(gese.isZero);
gese.step = 5;

// 4.Static Members and Factory funcs

class Counter4 {
  private _step = 1;
  private count: number;

  static created = 0;

  constructor(incr: number = 0) {
    this.count = incr;
    Counter4.created++;
  }

  inc(): this {
    this.count += this._step;
    return this;
  }
  dec(): this {
    this.count -= this._step;
    return this;
  }
  value(): number {
    return this.count;
  }

  get isZero(): boolean {
    return this.count === 0;
  }

  set step(n: number) {
    if (n < 0) {
      throw new Error("Step cant be negative");
    }
    this._step = n;
  }
}
let c = new Counter4();
c.dec;

function makeCounter(init: number = 0) {
  let count = init;
  let step = 1;
  return {
    inc() {
      count += step;
      return this;
    },
    dec() {
      count -= step;
      return this;
    },
    value() {
      return count;
    },
    get isZero() {
      return count === 0;
    },
    set step(n: number) {
      if (n < 0) {
        throw new Error("Step can't be negative");
      }
      step = n;
    },
  };
}
const a = makeCounter(5);
console.log(a.value());
a.dec().dec();
a.inc();
console.log(a.value());



class CounterBound {
  protected _step = 1;
  protected count: number;

  constructor(initial: number = 0) {
    this.count = initial;
  }
  inc(): this {
    this.count += this._step;
    return this;
  }
  dec(): this {
    this.count -= this._step;
    return this;
  }
  value() {
    return this.count;
  }
  get isZero(): boolean {
    return this.count === 0;
  }
  set step(n: number) {
    if (n < 0) {
      throw new Error("the value shoould not be negative");
    }
    this._step = n;
  }
}
class BoundedCounter extends CounterBound {
  private max: number;

  constructor(initial: number, max: number) {
    super(initial);
    this.max = max;
    this.clamp();
  }
  inc(): this {
    super.inc();
    this.clamp();
    return this;
  }
  dec(): this {
    super.dec();
    this.clamp();
    return this;
  }
  private clamp() {
    if (this.count < 0) {
      this.count = 0;
    }
    if (this.count > this.max) {
      this.count = this.max;
    }
  }
}
const b = new BoundedCounter(2, 19);
b.dec().dec().dec();
console.log(b.value());

