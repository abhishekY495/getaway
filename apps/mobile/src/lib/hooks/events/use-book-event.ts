import { bookEvent } from "@/lib/api/events";
import { useAuth } from "@clerk/expo";
import { BookingSchema_T } from "@repo/types";
import { useMutation } from "@tanstack/react-query";

export const useBookEvent = () => {
  const { getToken } = useAuth();

  return useMutation({
    mutationFn: async ({
      eventId,
      bookingData,
    }: {
      eventId: number;
      bookingData: BookingSchema_T;
    }) => {
      const token = await getToken();
      if (!token) {
        throw new Error("No token");
      }
      return bookEvent(token, eventId, bookingData);
    },
  });
};
