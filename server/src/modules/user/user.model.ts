// typegoose is a "wrapper" for easily writing Mongoose models with TypeScript
// you create class instead of schema and interface and you can create model from that class using getModelFromClass(Class)

import { getModelForClass, pre, prop } from '@typegoose/typegoose';
import argon2 from 'argon2';

// pre hook to hash passwords with argon2 before saved to DB
@pre<User>('save', async function (next) {
  if (this.isModified('password') || this.isNew) {
    const hash = await argon2.hash(this.password);

    this.password = hash;

    return next();
  }
})
export class User {
  @prop({ required: true, unique: true }) //@prop is a decorator and experimentalDecorators have to be enabled in tsconfig
  public username: string; // for this to work "experimentalDecorators": true and "strictPropertyInitialization": false have to be set in tsconfig.json

  @prop({ required: true, unique: true })
  public email: string;

  @prop({ required: true })
  public password: string;

  public async passwordMatch(password: string): Promise<boolean> {
    // no need to await as this is an async function so it will return Promise anyway
    return argon2.verify(this.password, password);
  }
}

export const UserModel = getModelForClass(User, {
  schemaOptions: {
    // this will add created at and updated at timestamps
    timestamps: true,
  },
});
