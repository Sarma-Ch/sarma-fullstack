export {};
const Name: string = "Charles Leclerc";
const id: number = 1;
const isGood: boolean = true;
console.log(name, id, isGood);

let value: any;
value = "zade";
value = 1;
value = true;

const nameIs: string = "undefined";
console.log(nameIs);

let x = "health";
console.log(typeof x);

let E;
E = "sarma";
E = 21;
console.log(typeof E);

let z: number = 42;
console.log(typeof z);

let valueIs: unknown = "hello";
let str = valueIs as string;
console.log(str.length);

console.log((<number>valueIs).toFixed(2)); // gives error as value is still a string type

// ## Type Assertiom
// Type Assertions are potentially unsafe because the type assertion says that
// to trust developer, so that the tsc will never do its typechecking
//  so if the type declared is incorrect then at runtime we will get error

function sarma(value: string | number | null): string {
  if (typeof value === "string") return value.length.toString();
  else if (typeof value === "number") return value.toString();
  else {
    return "null";
  }
}
const sarma_fun = sarma("Hey");
console.log(sarma_fun);

console.log(sarma("Justin"));
console.log(sarma(9));
console.log(sarma(null));

function handleInput(value: unknown): string {
  if (Array.isArray(value)) {
    return `Array length: ${value.length}`;
  }
  return "Not an array";
}
console.log(handleInput([1, 2, 3]));

let age = 10;
console.log(typeof age);

// // function add(a: number, b: number): string {
// //   return a + b;
// // }
// console.log(add(4, 9)); // gives error

function union(input: string | number | boolean): any {
  if (typeof input === "string") return input.toUpperCase();
  else if (typeof input === "number") {
    return input.toFixed(2);
  } else {
    return input ? "TRUE" : "FALSE";
  }
}
console.log(union("sarma"));
console.log(union(true));

const mixed: (number | string)[] = [1, "Alice", 2, "Bob"];
console.log(mixed);

const user1: { name: string; age: number; active: boolean } = {
  name: "John",
  age: 30,
  active: true,
};
console.log(user1.name);

//used type here
type USer = {
  name: string;
  age: number;
  active: boolean;
};

const user: USer = {
  name: "Philip",
  age: "twenty", // error type strng cant be assigned to the number
  active: true,
};
console.log(user.name);

let valueAny: any = "Hello";
valueAny.toUpperCase();
valueAny();

let valueUnknown: string = "Hi,sarma";
valueUnknown.toUpperCase();
valueUnknown();

// Typescript takes any as anytype of type and it gives no error

let itsArray: unknown = [1, 2, 3];
if (Array.isArray(itsArray)) {
  console.log(itsArray.length);
}

let y: any = 10;
y.toUpperCase(); //Here number cant be converted into uppercase
