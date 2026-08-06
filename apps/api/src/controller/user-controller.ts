import { clerkClient, getAuth } from "@clerk/express";
import type { Response, Request } from "express";
import { db } from "../config/db.js";
import { usersTable } from "../db/schema.js";
import { eq } from "drizzle-orm";

export const myInfo = async (req: Request, res: Response) => {
  const { isAuthenticated, userId } = getAuth(req);

  if (!isAuthenticated) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  const user = await clerkClient.users.getUser(userId);
  if (!user) {
    res.status(401).json({ error: "User does not exist" });
    return;
  }

  res.json({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.emailAddresses[0]?.emailAddress,
  });
};

export const addUser = async (req: Request, res: Response) => {
  try {
    const { isAuthenticated, userId } = getAuth(req);
    if (!isAuthenticated || !userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const existingUser = await db.query.usersTable.findFirst({
      where: eq(usersTable.clerkId, userId),
    });
    if (existingUser) {
      return res.status(200).json(existingUser);
    }

    const user = await clerkClient.users.getUser(userId);

    const primaryEmail = user.emailAddresses[0];
    if (!primaryEmail) {
      return res.status(400).json({ error: "User has no email address" });
    }

    const [newUser] = await db
      .insert(usersTable)
      .values({
        clerkId: user.id,
        firstName: user.firstName ?? "",
        lastName: user.lastName ?? "",
        email: primaryEmail.emailAddress,
      })
      .returning();

    return res.status(201).json(newUser);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};
