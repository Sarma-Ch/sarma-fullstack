import "dotenv/config";

function requireEnv(key: string): string {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Missing environment variable: ${key}`);
  }
  return value;
}

export const env = {
  API_KEY: requireEnv("API_KEY"),
  CLIENT_ID: requireEnv("CLIENT_ID"),
  CLIENT_SECRET: requireEnv("CLIENT_SECRET"),
  TOKEN_URL: requireEnv("TOKEN_URL"),
};
