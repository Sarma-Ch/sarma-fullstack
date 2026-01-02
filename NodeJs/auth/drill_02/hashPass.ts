import bcrypt from "bcrypt";

const SALT_ROUNDS = 12;

async function hashPassword(plain: string): Promise<string> {
  if (!plain) throw new Error("Password required");
  return await bcrypt.hash(plain, SALT_ROUNDS);
}

async function comparePassword(plain: string, hash: string): Promise<boolean> {
  if (!plain || !hash) return false;
  return await bcrypt.compare(plain, hash);
}

export { hashPassword };
export { comparePassword };
export { bcrypt };
