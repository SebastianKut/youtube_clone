import { User, UserAttr, UserModel } from './user.model';

// insted of creating seperate interface for user type attributes we can just use User class and omit comparePassword method, so we are only looking at email, username and password
export const createUser = async (user: Omit<User, 'passwordMatch'>) => {
  return UserModel.create(user);
};

export const findUserByEmail = async (email: User['email']) => {
  return UserModel.findOne({ email });
};
