// 1 FUNCTION BASICS
let Add: (x: number, y: number) => number = function (x, y): number {
  return x + y;
};
console.log(Add(5, 6));

let Sum: (x: number, y: number) => void = function (x, y): void {
  console.log(x + y);
};
Sum(2, 20);

// 2 OPTIONAL & DEFAULT PARAMS
function greet(name: string, age = 18): any {
  if (age !== undefined) {
    console.log(`Hey ${name}, Are you >  ${age} yrs`);
  } else {
    console.log(`hey ${name}`);
  }
}
greet("sarma", 12);
greet("bro");

//3  Rest Parameters

function sumAll(...nums: number[]): number {
  return nums.reduce((total, num) => total + num, 0);
}
console.log(sumAll(1, 2, 3));
console.log(sumAll(10));
console.log(sumAll());

function sumall(...nums: (string | number)[]): number {
  return nums.reduce((total: number, num) => total + Number(num), 0);
}
console.log(sumall(1, "2", 3, "4"));

// 4 Function Overloading

function toArray(x: string | number): string[] | number[] {
  if (typeof x === "string") return [x];
  else {
    return [x];
  }
}
console.log(toArray("KAMESWARARAO"));
console.log(toArray(12345678));
// console.log(toArray(true))

// 5 UNIONS IN FUNCTIONS

function union(input: string | number | boolean): any {
  if (typeof input === "string") return input.toUpperCase();
  else if (typeof input === "number") {
    return input.toFixed(2);
  } else {
    return input ? "TRUE" : "FALSE";
  }
}
console.log(union("cristiano"));
console.log(union(808_763));
console.log(union(true));

// 6: Control Flow with Types
function checkEven(n: number): boolean {
  return n % 2 === 0;
}

if (checkEven(4)) {
  console.log("Even");
}

let decrementCounter = 10;
while (decrementCounter > 0) {
  decrementCounter--;
}

type ControlState = "start" | "stop" | "pause";
function handleState(state: ControlState): void {
  switch (state) {
    case "start":
      console.log("Starting");
      break;
    case "stop":
      console.log("Stopping");
      break;
    case "pause":
      console.log("Pausing");
      break;
    default:
      const exhaustive: never = state;
      console.log(exhaustive);
  }
}

// 7: Higher-Order Functions
function applyTwice(fn: (x: number) => number, val: number): number {
  return fn(fn(val));
}

console.log(applyTwice((n) => n * 2, 5)); // 20

function applyTwiceGeneric<T>(fn: (x: T) => T, val: T): T {
  return fn(fn(val));
}

const Twice = applyTwiceGeneric((s) => s + "!", "hi");
console.log(Twice);

// 8: Arrow Functions
const squareArrow = (n: number): number => n * n;

const numbersArray = [1, 2, 3, 4, 5];
const doubledValues = numbersArray.map((n) => n * 2);
const evenNumbers = numbersArray.filter((n) => n % 2 === 0);
const totalSum = numbersArray.reduce((acc, n) => acc + n, 0);

console.log(doubledValues);
console.log(evenNumbers);
console.log(totalSum);

// DRILL 9: Function Type Annotations
type MathCalculator = (a: number, b: number) => number;
type StringValidator = (input: string) => boolean;

const Calc: MathCalculator = (a, b) => a ** b;
const emailCheck: StringValidator = (input) => input.includes("@");

function executeCalc(calcFn: MathCalculator, x: number, y: number): number {
  return calcFn(x, y);
}

function runValidator(validateFn: StringValidator, text: string): boolean {
  return validateFn(text);
}

console.log(executeCalc(Calc, 2, 3));
console.log(runValidator(emailCheck, "123@email.com"));

// DRILL 10: Return Type Practic
function processUnknownData(data: unknown): string {
  if (typeof data === "string") {
    return data.toUpperCase();
  }
  if (typeof data === "number") {
    return data.toFixed(2);
  }
  return "Unknown";
}

function alwaysThrows(message: string): never {
  throw new Error(message);
}

// DRILL 11: Callback Function Typing
type NumberProcessor = (value: number, index: number) => number;

function processArrayWithCallback(
  arr: number[],
  callback: NumberProcessor
): number[] {
  return arr.map(callback);
}

const processedData = processArrayWithCallback([1, 2, 3], (v, i) => v * i);
console.log(processedData);

// DRILL 12: Practical Function Scenarios
function validateUser(name: string, email: string, age?: number): boolean {
  const Name = name.length > 0;
  const ValidEmail = email.includes("@") && email.includes(".");
  const ValidAge = age === undefined || (age >= 0 && age < 150);
  return Name && ValidEmail && ValidAge;
}

function transformData(...inputs: (string | number)[]): string[] {
  return inputs.map((v) => String(v).toUpperCase());
}

type ConfigOptions = {
  debug?: boolean;
  timeout?: number;
  retries?: number;
};

function createConfig(options: ConfigOptions = {}): ConfigOptions {
  return {
    debug: options.debug ?? false,
    timeout: options.timeout ?? 5000,
    retries: options.retries ?? 3,
  };
}

console.log(validateUser("Sunanda", "kamya@gmail.com", 25));
console.log(transformData(28, "hello", 3.14));
console.log(createConfig({ debug: true }));
