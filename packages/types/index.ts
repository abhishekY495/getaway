import { z } from "zod";

export type API_RESPONSE_T = {
  status: string;
  statusMessage: string;
  data?: string;
};

export const SignUpSchema = z.object({
  firstName: z.string().trim().min(1, "First name is required"),
  lastName: z.string().trim().min(1, "Last name is required"),
  email: z.email("Enter a valid email").trim().min(1, "Email is required"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});
export type SignUpSchema_T = z.infer<typeof SignUpSchema>;

//

export const SignInSchema = z.object({
  email: z.email("Enter a valid email").trim().min(1, "Email is required"),
  password: z.string().min(1, "Password is required"),
});
export type SignInSchema_T = z.infer<typeof SignInSchema>;

//

export const CodeSchema = z.object({
  code: z.string().min(1, "Code is required"),
});
export type CodeSchema_T = z.infer<typeof CodeSchema>;

//

export const TopDestinationSchema = z.object({
  id: z.number(),
  name: z.string(),
  coverImage: z.string(),
});
export type TopDestinationSchema_T = z.infer<typeof TopDestinationSchema>;
export type GetTopDestinationsResponse_T = {
  data: TopDestinationSchema_T[];
};

//

export const TopVenueSchema = z.object({
  id: z.number(),
  name: z.string(),
  coverImage: z.string(),
  description: z.string(),
  rating: z.string(),
  reviewCount: z.number(),
});
export type TopVenueSchema_T = z.infer<typeof TopVenueSchema>;
export type GetTopVenuesResponse_T = {
  data: TopVenueSchema_T[];
};

//

export const TopEventSchema = z.object({
  id: z.number(),
  title: z.string(),
  coverImage: z.string().nullable(),
  rating: z.string(),
  reviewCount: z.number(),
  lowestPrice: z.string(),
});
export type TopEventSchema_T = z.infer<typeof TopEventSchema>;
export type GetTopEventsResponse_T = {
  data: TopEventSchema_T[];
};

//

export const SearchSchema = z.object({
  destinations: z.array(
    z.object({
      id: z.number(),
      name: z.string(),
      country: z.string(),
      coverImage: z.string(),
    }),
  ),
  venues: z.array(
    z.object({
      id: z.number(),
      name: z.string(),
      coverImage: z.string(),
      rating: z.string(),
      reviewCount: z.number(),
    }),
  ),
  events: z.array(
    z.object({
      id: z.number(),
      title: z.string(),
      coverImage: z.string().nullable(),
      rating: z.string(),
      reviewCount: z.number(),
    }),
  ),
});
export type SearchSchema_T = z.infer<typeof SearchSchema>;
export type SearchResponse_T = {
  data: SearchSchema_T;
};

//

export const CityEventSchema = z.object({
  id: z.number(),
  title: z.string(),
  coverImage: z.string().nullable(),
  rating: z.string(),
  reviewCount: z.number(),
  lowestPrice: z.string(),
});
export const CitySchema = z.object({
  name: z.string(),
  coverImage: z.string(),
});
export type CitySchema_T = z.infer<typeof CitySchema>;
export type CityEventSchema_T = z.infer<typeof CityEventSchema>;
export type GetCityEventsResponse_T = {
  data: {
    city: CitySchema_T;
    events: CityEventSchema_T[];
  };
};

//

export const VenueSchema = z.object({
  name: z.string(),
  coverImage: z.string(),
});
export type VenueSchema_T = z.infer<typeof VenueSchema>;
export type GetVenueEventsResponse_T = {
  data: {
    venue: VenueSchema_T;
    events: CityEventSchema_T[];
  };
};

//

export const OperatingHourSchema = z.object({
  day: z.string(),
  open: z.string(),
  close: z.string(),
});
export type OperatingHourSchema_T = z.infer<typeof OperatingHourSchema>;

export const EventSchema = z.object({
  id: z.number(),
  title: z.string(),
  venue: z.string(),
  images: z.array(z.string()),
  operatingHours: z.array(OperatingHourSchema),
  rating: z.string(),
  reviewCount: z.number(),
  adultPrice: z.string(),
  childPrice: z.string(),
  highlights: z.array(z.string()),
  inclusions: z.array(z.string()),
  exclusions: z.array(z.string()),
  cancellationPolicy: z.string(),
  mealsIncluded: z.boolean(),
  bookNowPayLater: z.boolean(),
});
export type EventSchema_T = z.infer<typeof EventSchema>;
export type GetEventResponse_T = {
  data: EventSchema_T;
};

//

export type ParsedEvent_T = {
  id: string;
  title: string;
  coverImage: string;
};

//

export const BookingSchema = z.object({
  visitDate: z.iso.date(),
  adultQuantity: z.number().int().nonnegative(),
  childQuantity: z.number().int().nonnegative(),
});
export type BookingSchema_T = z.infer<typeof BookingSchema>;

export const BookingSchemaResponse = z.object({
  bookingId: z.number,
  bookingReference: z.string(),
});
export type BookingSchemaResponse_T = z.infer<typeof BookingSchemaResponse>;

//

export const UserBookingSchema = z.object({
  bookingReference: z.string(),
  visitDate: z.date(),
  eventId: z.number(),
  eventTitle: z.string(),
  eventCoverImage: z.string().nullable(),
  adultQuantity: z.number(),
  childQuantity: z.number(),
  totalAmount: z.string(),
});
export type UserBookingSchema_T = z.infer<typeof UserBookingSchema>;
export type UserBookingSchemaResponse_T = {
  data: UserBookingSchema_T[];
};
