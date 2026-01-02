type UserIs = "user" | "admin";

interface User {
  id: number;
  email: string;
  passwordHash: string;
  role: UserIs;
}

export type UserCreation = {
  email: string;
  passwordHash: string;
  role?: "user" | "admin";
};

export { UserIs };
export { User };
