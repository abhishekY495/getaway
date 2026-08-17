import { Type } from "@google/genai";
import { getBookingsService } from "../services/booking-service.js";
import { getCityEventsByCityNameService } from "../services/event-service.js";

const searchEventsTool = {
  type: "function" as const,
  name: "search_events",
  description:
    "Search for events and experiences. Use this when the user wants to find activities, attractions, tours, or experiences in a particular city or based on a search query.",
  parameters: {
    type: Type.OBJECT,
    properties: {
      query: {
        type: Type.STRING,
        description: "The search keyword, the user is looking for.",
      },
    },
    required: ["query"],
  },
};
const getMyBookingsTool = {
  type: "function" as const,
  name: "get_my_bookings",
  description:
    "Retrieve a list of all events booked by the user. Use this when the user asks to see their bookings, reservations, tickets, or trips.",
  parameters: {
    type: Type.OBJECT,
    properties: {},
  },
};

export const tools = [searchEventsTool, getMyBookingsTool];

export async function executeTool(
  name: string,
  args: Record<string, unknown>,
  userId: number,
) {
  switch (name) {
    case "search_events":
      return await getCityEventsByCityNameService(args.query as string);
    case "get_my_bookings":
      return await getBookingsService(userId);
    default:
      throw new Error(`Unknown tool: ${name}`);
  }
}
