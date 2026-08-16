import { eq } from "drizzle-orm";
import { db } from "../config/db.js";
import { usersTable } from "../db/schema.js";

export const getUserService = async (userId: string) => {
  const [user] = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.clerkId, userId))
    .limit(1);

  return user;
};
