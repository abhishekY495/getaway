import "dotenv/config";

function getEnv(name: keyof NodeJS.ProcessEnv): string {
  const value = process.env[name];

  if (!value) {
    throw new Error(`${name} is missing`);
  }

  return value;
}

export const ENV = {
  PORT: getEnv("PORT"),
  NODE_ENV: getEnv("NODE_ENV"),
  DATABASE_URL: getEnv("DATABASE_URL"),
};
