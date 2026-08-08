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

export const TopDestinationsSchema = z.object({
  id: z.number(),
  name: z.string(),
  coverImage: z.string(),
});
export type TopDestinationsSchema_T = z.infer<typeof TopDestinationsSchema>;
export type GetTopDestinationsResponse_T = {
  data: TopDestinationsSchema_T[];
};

//

export const TopVenuesSchema = z.object({
  id: z.number(),
  name: z.string(),
  coverImage: z.string(),
  description: z.string(),
  rating: z.string(),
  reviewCount: z.number(),
});
export type TopVenuesSchema_T = z.infer<typeof TopVenuesSchema>;
export type GetTopVenuesResponse_T = {
  data: TopVenuesSchema_T[];
};

//

export const TopEventsSchema = z.object({
  id: z.number(),
  title: z.string(),
  coverImage: z.string().nullable(),
  rating: z.string(),
  reviewCount: z.number(),
  lowestPrice: z.string(),
});
export type TopEventsSchema_T = z.infer<typeof TopEventsSchema>;
export type GetTopEventsResponse_T = {
  data: TopEventsSchema_T[];
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
