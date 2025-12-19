function identity<T>(arg: T) {
  return arg;
}
const num = identity(2);
const str = identity("Asus Tuf F17");
const obj = identity({ id: 1, name: "DevOps" });
console.log(num);

const typeInf = identity<string>("Scuderia Ferrari");

function identityAny<T>(arg: T): any {
  return arg;
}
const any = identityAny("Sarma");
console.log(any.length);
console.log(any.toFixed);

// 2

function first<T>(arr: T[]): T | undefined {
  return arr[1];
}
const numArr: number[] = [1, 2, 3];
const firstNum = first(numArr);
if (firstNum !== undefined) {
  console.log(firstNum.toFixed(2));
}
const strArr = first(["s", "a", "m", "m"]);
console.log(strArr?.toUpperCase());

const mixed = first([1, "two"]);
console.log(mixed);

function lengthOf<T extends { length: number }>(x: T): number {
  return x.length;
}
const lenOfStr = lengthOf("sarma");
console.log(lenOfStr);

const arrLen = lengthOf([1, 2, 3, 4, 5, 7]);
console.log(arrLen);

// const numLen = lengthOf(5)
// console.log(numLen)                   // Error as arg of  type num cant have len property

// interface HasId {
//   id: number;
// }

// interface HasName {
//   name: number;
// }

// function lengthIs<T extends HasId & HasName>(x: T): string {
//   return `i have my ${x.id} and my name is ${x.name}`;
// }
// const user = { id: 2, name: "Spill" };
// console.log(lengthIs(user));

// 4 Default Type Parameters
type ApiResponse<T = string> = { status: number; data: T };

const Api: ApiResponse = {
  status: 1,
  data: "this is done",
};
console.log(Api.status);

type ApiResponse1 = { status: number; data: unknown };
const Api1: ApiResponse1 = {
  status: 2,
  data: "THis is not yet done",
};
console.log(Api1.status);
// console.log(Api1.data.toUpperCase("sarma"));

type Keys<T> = keyof T;

interface User {
  id: string;
  age: number;
}

type UserKeys = Keys<User>;

function getProp<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const user1: User = { id: "one", age: 20 };

const id = getProp(user1, "id");

// const missing = getProp(user1, "missing")

type user3 = {
  id: number;
  name: string;
};

const user3 = { id: 3, name: "Narasimha" };

type Readonly<T> = { readonly [K in keyof T]: T[K] };
type ReadonlyUser3 = Readonly<user3>;

type Partial<T> = { [K in keyof T]?: T[K] };
type Partial1 = Partial<user3>;
const PartialUser: Partial1 = { name: "no" };
console.log(PartialUser.id);
console.log(PartialUser.name);

// Test with IsString<string> and IsString<number>

// type IsString<T> = T extends string ? true : false;
// type IsStringName = IsString<user3["name"]>;
// function getString<T extends user3>(user: T): T["name"] {
//   return user.name;
// }
// console.log(getString(user3));

// type IsStringNumber = IsString<user3["id"]>;
// function GetString<T extends user3>(user: T): T["id"] {
//   return user.id;
// }
// console.log(GetString(user3));

// Conditional type to check if T is a string
type IsString<T> = T extends string ? true : false;

type TestString = IsString<string>;
type TestNumber = IsString<number>;

const check: IsString<string> = true;
console.log("IsString<string>", check);
const check1: IsString<number> = false;

type ElementType<T> = T extends (infer U)[] ? U : T;

type Test3 = ElementType<string[]>;
type Test4 = ElementType<number[]>;
type Test5 = ElementType<boolean>;

//8

interface user {
  id: string;
  age: number;
}

const userDict: Record<string, user> = {
  first: { id: "A1", age: 18 },
  second: { id: "B1", age: 22 },
};
console.log(userDict["first"]);

type pickUserId = Pick<User, "id">;
const userId: pickUserId = {
  id: "one",
};
console.log("Picked id:", userId.id);

type OmitAge = Omit<user, "age">;
const forbidden: OmitAge = {
  id: "two",
};
console.log("User ommited age ", forbidden.id);

// function pluck<T, K extends keyof T>(objs: T[], key: K): T[K][]{
//   return 
// }
