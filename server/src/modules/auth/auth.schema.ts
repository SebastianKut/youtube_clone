import { object, string, TypeOf } from 'zod';

export const loginUserSchema = {
  body: object({
    email: string({
      required_error: 'Email is required',
    }).email('Must be a valid email'),
    password: string({
      required_error: 'Password is required',
    })
      .min(6, 'Password must be at least 6 characters')
      .max(64, 'Password must be shorter than 64 characters'),
  }),
};

// we can export typescript and create it using TypeOf from zod, then use this type in a Request
export type LoginUserBody = TypeOf<typeof loginUserSchema.body>;
