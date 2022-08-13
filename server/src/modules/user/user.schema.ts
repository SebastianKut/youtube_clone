import { object, string, TypeOf } from 'zod';

// Zod is a declaration and validation library

export const registerUserSchema = {
  body: object({
    // properties are required by default, if non required append .optional()
    username: string({
      required_error: 'Username is required',
    }),
    email: string({
      required_error: 'Email is required',
    }).email('Must be a valid email'),
    password: string({
      required_error: 'Password is required',
    })
      .min(6, 'Password must be at least 6 characters')
      .max(64, 'Password must be shorter than 64 characters'),
    confirmPassword: string({
      required_error: 'You must confirm your password',
    }),
  }).refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  }),
};

// we can export typescript and create it using TypeOf from zod, then use this type in a Request
export type RegisterUserBody = TypeOf<typeof registerUserSchema.body>;
