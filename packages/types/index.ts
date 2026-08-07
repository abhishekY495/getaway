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
