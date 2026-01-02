import { bcrypt } from "./hashPass";
export async function hashPassword(plain: string): Promise<string> {
  return bcrypt.hash(plain, 12);
}
