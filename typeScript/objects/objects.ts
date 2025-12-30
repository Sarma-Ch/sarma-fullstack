// 1. Object Types

// interface Person {
//   readonly EntryId : string
//   name : string
//   age : number
// }

// let Person :Person = { EntryId : "Welcome123", name : "sarma", age : 20}
// Person.EntryId = "WElcome345" // Cannot be reassigned coz it is read-only prop

// let Person :Person = { name : "sarma", age : "twenty"}
// // String is not assignable to number type

// 2. Interfaces vs Type Alliases

//  interface  Car {
//   make : string,
//   model : string
//  }

//  interface ElectricCar extends Car {
//   batteryCapacity : number;
//  }

//  const tesla: ElectricCar = {
//   make: "Tesla",
//   model : "model1",
//   batteryCapacity :20
//  }

//  type Bike = {
//   make : string,
//   gears : number
//  }

// //3.Optional Props
// interface Person {
//   readonly EntryId: string;
//   name: string;
//   age: number;
//   middleName?: string;
// }

// let Person: Person = { EntryId: "Welcome123", name: "sarma", age: 20 };

// //using optnal chaining
// const mid = Person.middleName?.toLowerCase();
// console.log(mid);

// // without checking
// const middleName = Person.middleName.toUpperCase(); // it says obj is possibly undefined
// console.log(middleName);

// 4. Index Signatures

// interface Dictionary {
//   [key: string]: string | number;
// }
// const entries: Dictionary = {
//   en: "Hello",
//   fr: "Bonjour",
// };
// entries.en = 123; // by adding number to return type it is possible now

// console.log(entries);
// console.log(entries.en);

// # Partial TYpes

// interface Person {
//   // readonly EntryId: string;
//   name: string;
//   age: number;
//   middleName?: string;
// }

// let partialPerson: Partial<Person> = {
//   name: "sarma",
// };

// console.log(partialPerson);

// type PersonName = Pick<Person, "name">;

// const Namaiwa: PersonName = {
//   name: "Taylor",
// };

// console.log(Namaiwa);

// type OmitAge = Omit<Person, "age">;
// const noAge : OmitAge=  {
//   EntryId : "Welcom123",
//   name : "sarma",
//   middleName : "string"
// };
// console.log(noAge)

// type combine = Partial<Pick<Person, "name" | "middleName">>;
// //here we pick name and middlename and make them partiak
// const p: combine = {
//   name: "Sarma",
// };

// console.log(p);

// interface Employee extends Person {
//   role: string;
//   department?: string;
// }
// const employee: Employee = {
//   // EntryId: "T120",
//   name: "singh",
//   age: 32,
//   role: "developer",
//   department: "CSE",
// };
// console.log(employee.name);
// console.log(employee);

// type omitField = Omit<Person, "name">;
// const noName: omitField = {
//   EntryId: "T21",
//   age: 22,
// };

// console.log(noName);
// // no error

// 7. STructural Typing
// function accept(person: Person) {
//   console.log(`Hey ${person.name}, age ${person.age}`);
// }
//  accept ({
//   name : "Verstappen",
//   age : 28,
//   Region : "dutch"
// });
// // it gives error

// accept(employee);

//  // Record
// type fruits = Record<string, number>;

// const price: fruits = {
//   apple: 120,
//   tangerines: 80,
// };
// console.log(price.apple);

// // MAP
// interface Person {
//   name: string;
//   age: number;
// }

// const peopleMap = new Map<string, Person>();
// peopleMap.set("User 1", { name: "Lewis", age: 20 });
// peopleMap.set("User 2", { name: "Juice Wrld", age: 21 });

// console.log(peopleMap.get("User 1"));
