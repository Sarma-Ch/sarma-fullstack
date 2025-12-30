export {};

type Status = "loading" | "success" | "error";

const handle = (status: Status) => {
  switch (status) {
    case "loading":
      console.log("Loading..");
      break;
    case "success":
      console.log("Succeeded..");
      break;
    case "error":
      console.log(" UNknown Error ");
      break;
    default: {
      const exhaustiveCheck: never = status;
      return exhaustiveCheck;
    }
  }
};
console.log(handle("success"));

// type HasId = { id: string };

// type HasTimestamps = <omit>({ createdAt: Date updatedAt: Date });

// type Entity = HasId & HasTimestamps;

// const entity: Entity = {
//    id: "s123",
//   createdAt: new Date("2025-06-07"),
// updatedAt: new Date("2025-11-09"),    // Raises error that entity doesnot have timestamp
// };

type Shape =
  | { kind: "circle"; radius: number }
  | { kind: "square"; size: number }
  | { kind: "rectangle"; width: number; height: number };

function area(shape: Shape): number {
  switch (shape.kind) {
    case "circle":
      return Math.PI * shape.radius ** 2;
    case "square":
      return shape.size ** 2;
    case "rectangle":
      return shape.width * shape.height;
    default: {
      const exhaustiveCheck: never = shape;
      throw new Error("Unknown Shape");
    }
  }
}

const circle: Shape = { kind: "circle", radius: 5 };
const square: Shape = { kind: "square", size: 4 };
const rect: Shape = { kind: "rectangle", width: 3, height: 6 };

console.log(area(circle));
console.log(area(square));
console.log(area(rect));

type Shape1 =
  | { kind: "circle"; radius: number }
  | { kind: "square"; size: number }
  | { kind: "rectangle"; width: number; height: number };

function isCircle(s: Shape1): s is { kind: "circle"; radius: number } {
  return s.kind === "circle";
}

const Area1 = (shape: Shape1) => {
  if (shape.kind === "circle") {
    return Math.PI * shape.radius ** 2;
  }
  // if (shape.kind === "square") {
  //   return shape.size ** 2;
  // }
  // return shape.width * shape.height;

  if ("size" in shape) {
    return shape.size ** 2;
  }
};
console.log(Area1(rect));

type PromiseType<T> = T extends Promise<infer U> ? U : T;

type str = PromiseType<Promise<string>>; // string
type num = PromiseType<Promise<number>>; // number
type bool = PromiseType<boolean>; // boolean

const Str: str = "hello";
console.log(Str);
const Num: num = 1;
const Boo: bool = true;
type Nullable<T> = T | null;

type NoNullable<T> = T extends null | undefined ? never : T;

type NoN = NoNullable<string | null | undefined>; // string

//6
type UserType = {
  id?: number;
  name: string;
  age?: number;
};

type ReqUser = Required<UserType>;

const u1: ReqUser = {
  id: 1,
  name: "TypeScript",
  age: 80,
};

type Freeze = Readonly<UserType>;

const F1: Freeze = {
  id: 1,
  name: "Bruno",
  age: 35,
};
// F1.age = 22; // Cant assign as it is readOnly prop

type numbers = 1 | 2 | 3;
type nums = Extract<numbers, 1 | 5>;

type Letters = "a" | "b" | "c";
type WithoutA = Exclude<Letters, "a">;
type Result = Exclude<"a" | "b" | "c", "a">;

type Events = "click" | "hover" | "focus";

type EventHandlerNames = `on${Capitalize<Events>}`;

let EHN: EventHandlerNames;

EHN = "onClick";
EHN = "onHover";

type User1 = {
  id: string;
  profile: {
    name: string;
    address: {
      city: string;
    };
  };
};

type City = User1["profile"]["address"]["city"];

type JsonValue =
  | string
  | number
  | boolean
  | null
  | JsonValue[]
  | { [k: string]: JsonValue };

const forNum: JsonValue = "Hii";
console.log(forNum);

const Obj: JsonValue = { user: { name: "Alice", age: 25 } };
console.log(Obj);
