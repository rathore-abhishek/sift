import { z } from "zod";

export const signupSchema = z.object({
  name: z.string("Name must be at least 2 characters"),
  email: z.email("Invalid email address"),
  password: z.regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
  ),
});

export type SignupInput = z.infer<typeof signupSchema>;
