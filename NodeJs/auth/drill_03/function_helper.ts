import bcrypt from "bcrypt";

const SALT_ROUNDS = 12;
async function hashPassword(plain: string): Promise<string> {
  return bcrypt.hash(plain, SALT_ROUNDS);
}

async function comparePassword(plain: string, hash: string): Promise<boolean> {
  return bcrypt.compare(plain, hash);
}
export { comparePassword };
export { hashPassword };
