import { GoogleGenAI } from "@google/genai";
import { ENV } from "../config/env.js";
import { executeTool, tools } from "../ai/tools.js";
import type {
  ChatEventSchema_T,
  ChatResponseSchema_T,
  UserBookingSchema_T,
} from "@repo/types";
import { SYSTEM_INSTRUCTION } from "../utils/constants.js";

const client = new GoogleGenAI({
  apiKey: ENV.GEMINI_API_KEY,
});

export const chatWithGemini = async ({
  message,
  previousInteractionId,
  userId,
}: {
  message: string;
  previousInteractionId?: string;
  userId: number;
}): Promise<ChatResponseSchema_T> => {
  let interaction = await client.interactions.create({
    model: "gemini-3.7-flash",
    input: message,
    tools,
    store: true,
    system_instruction: SYSTEM_INSTRUCTION,
    ...(previousInteractionId
      ? {
          previous_interaction_id: previousInteractionId,
        }
      : {}),
  });

  let data: ChatResponseSchema_T["data"] = null;

  while (true) {
    const functionCalls = interaction.steps.filter(
      (step) => step.type === "function_call",
    );
    if (functionCalls.length === 0) {
      break;
    }

    const executedTools = await Promise.all(
      functionCalls.map(async (func) => {
        const result = await executeTool(
          func.name,
          func.arguments ?? {},
          userId,
        );

        return {
          name: func.name,
          id: func.id,
          result,
        };
      }),
    );

    for (const tool of executedTools) {
      if (tool.name === "search_events") {
        data = {
          type: "events",
          items: tool.result as ChatEventSchema_T[],
        };
        break;
      }
      if (tool.name === "get_my_bookings") {
        data = {
          type: "bookings",
          items: tool.result as UserBookingSchema_T[],
        };
        break;
      }
    }

    const functionResults = executedTools.map((tool) => ({
      type: "function_result" as const,
      name: tool.name,
      call_id: tool.id,
      result: [
        {
          type: "text" as const,
          text: JSON.stringify(tool.result),
        },
      ],
    }));

    interaction = await client.interactions.create({
      model: "gemini-3.7-flash",
      input: functionResults,
      tools,
      store: true,
      previous_interaction_id: interaction.id,
    });
  }

  return {
    interactionId: interaction.id,
    message: interaction.output_text ?? "",
    data,
  };
};
