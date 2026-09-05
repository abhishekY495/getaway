import type { Request, Response } from "express";
import { db } from "../config/db.js";
import { usersTable } from "../db/schema.js";
import { eq } from "drizzle-orm";

export const sendNotification = async (req: Request, res: Response) => {
  try {
    const { userId, email, title, description } = req.body;

    if (!title || !description) {
      return res.status(400).json({
        message: "title and description are required",
      });
    }

    if (!userId && !email) {
      return res.status(400).json({
        message: "Either userId or email is required",
      });
    }

    // Find user by ID or email
    const [user] = await db
      .select({
        id: usersTable.id,
        email: usersTable.email,
        expoPushToken: usersTable.expoPushToken,
      })
      .from(usersTable)
      .where(
        userId
          ? eq(usersTable.id, Number(userId))
          : eq(usersTable.email, email),
      )
      .limit(1);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    if (!user.expoPushToken) {
      return res.status(400).json({
        message: "User does not have an Expo push token",
      });
    }

    const response = await fetch("https://exp.host/--/api/v2/push/send", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        to: user.expoPushToken,
        title,
        body: description,
        sound: "default",
      }),
    });

    const data = await response.json();
    console.log(data);
    return res.json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};
