import { getAuth } from "@clerk/express";
import { ChatRequestSchema, type ChatResponseSchema_T } from "@repo/types";
import type { Request, Response } from "express";
import { chatWithGemini } from "../services/gemini-service.js";
import { getUserService } from "../services/user-service.js";

export const chatting = async (
  req: Request,
  res: Response<ChatResponseSchema_T | { error: string }>,
) => {
  try {
    const { isAuthenticated, userId } = getAuth(req);
    if (!isAuthenticated) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    const dbUser = await getUserService(userId);
    if (!dbUser) {
      res.status(404).json({ error: "User does not exist" });
      return;
    }

    const { message, previousInteractionId } = ChatRequestSchema.parse(
      req.body,
    );

    const result = await chatWithGemini({
      message,
      userId: dbUser.id,
      ...(previousInteractionId ? { previousInteractionId } : {}),
    });

    res.json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};
