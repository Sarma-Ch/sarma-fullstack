// DRILL 1: Function Basics
function addNumbers(a: number, b: number): number {
  return a + b;
}

console.log(addNumbers(3, 4)); // 7

function logMessage(): void {
  console.log("No return value");
}

logMessage();
// logMessage(); return "test"; // Error: Type 'string' is not assignable to type 'void'

// DRILL 2: Optional & Default Parameters
function greetUser(name: string, age?: number): void {
  if (age !== undefined) {
    console.log(`Hello ${name}, age ${age}`);
  } else {
    console.log(`Hello ${name}`);
  }
}

greetUser("Alice");
greetUser("Bob", 25);

function greetWithDefault(name: string, age: number = 18): void {
  console.log(`Hello ${name}, age ${age}`);
}

greetWithDefault("Charlie");
greetWithDefault("Dana", 30);

// DRILL 3: Rest Parameters
function sumAllNumbers(...nums: number[]): number {
  return nums.reduce((acc, n) => acc + n, 0);
}

console.log(sumAllNumbers(1, 2, 3, 4)); // 10
console.log(sumAllNumbers(5, 10)); // 15

// function sumMixed(...values: (string | number)[]): number {
//   return values.reduce((acc, v) => acc + Number(v), 0);
// }

// console.log(sumMixed("1", 2, "3")); // 6

// // DRILL 4: Function Overloading
// function toArrayValue(x: string): string[];
// function toArrayValue(x: number): number[];
// // function toArrayValue(x: string | number): string[] | number[] {
//   // return Array(x.length || x).fill(x);
// }

// console.log(toArrayValue("hello")); // ["hello", "hello", "hello", "hello", "hello"]
// console.log(toArrayValue(3)); // [3, 3, 3]

// DRILL 5: Unions in Functions
function formatValue(input: string | number | boolean): string {
  if (typeof input === "string") {
    return input.toUpperCase();
  } else if (typeof input === "number") {
    return input.toFixed(2);
  } else {
    return input ? "true" : "false";
  }
}

console.log(formatValue("hello")); // "HELLO"
console.log(formatValue(3.14159)); // "3.14"
console.log(formatValue(true)); // "true"

// DRILL 6: Control Flow with Types
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
  }
}

// DRILL 7: Higher-Order Functions
function applyTwiceNumber(fn: (x: number) => number, val: number): number {
  return fn(fn(val));
}

console.log(applyTwiceNumber((n) => n * 2, 5)); // 20

function applyTwiceGeneric<T>(fn: (x: T) => T, val: T): T {
  return fn(fn(val));
}

console.log(applyTwiceGeneric((s) => s + "!", "hi")); // "hi!!"

// DRILL 8: Arrow Functions
const squareArrow = (n: number): number => n * n;

const numbersArray = [1, 2, 3, 4, 5];
const doubledValues = numbersArray.map((n) => n * 2);
const evenNumbers = numbersArray.filter((n) => n % 2 === 0);
const totalSum = numbersArray.reduce((acc, n) => acc + n, 0);

console.log(doubledValues); // [2, 4, 6, 8, 10]
console.log(evenNumbers); // [2, 4]
console.log(totalSum); // 15

// DRILL 9: Function Type Annotations
type MathCalculator = (a: number, b: number) => number;
type StringValidator = (input: string) => boolean;

const powerCalc: MathCalculator = (a, b) => a ** b;
const emailCheck: StringValidator = (input) => input.includes("@");

function executeCalc(calcFn: MathCalculator, x: number, y: number): number {
  return calcFn(x, y);
}

function runValidator(validateFn: StringValidator, text: string): boolean {
  return validateFn(text);
}

console.log(executeCalc(powerCalc, 2, 3)); // 8
console.log(runValidator(emailCheck, "test@email.com")); // true

// DRILL 10: Return Type Practice
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
console.log(processedData); // [0, 2, 6]

// DRILL 12: Practical Function Scenarios
function validateUserProfile(
  name: string,
  email: string,
  age?: number
): boolean {
  const hasName = name.length > 0;
  const hasValidEmail = email.includes("@") && email.includes(".");
  const hasValidAge = age === undefined || (age >= 0 && age < 150);
  return hasName && hasValidEmail && hasValidAge;
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

console.log(validateUserProfile("John", "john@test.com", 25)); // true
console.log(transformData(42, "hello", 3.14)); // ["42", "HELLO", "3.14"]
console.log(createConfig({ debug: true })); // { debug: true, timeout: 5000, retries: 3 }
