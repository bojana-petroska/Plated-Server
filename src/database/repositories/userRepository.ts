import { IUser, UserInput } from '../../types/userTypes.js';
import { User } from '../entities/User.js';
import { AppDataSource } from '../ormconfig.js';

const userRepository = AppDataSource.getRepository(User);

const getUsers = async (): Promise<IUser[]> => await userRepository.find();

const getUser = async (user_id: number): Promise<IUser> => {
  const user = await userRepository.findOneBy({ user_id });
  if (!user) {
    throw new Error(`User with id: ${user_id} not found.`);
  }
  return user;
};

const createUser = async ({
  userName,
  email,
  password,
}: UserInput): Promise<IUser> => {
  const user = {
    userName,
    email,
    password,
    address: '',
    phoneNumber: '',
    createdAt: new Date(),
  };
  const newUser = await userRepository.save(user);
  return newUser;
};

const updateUser = async (
  user_id: number,
  updatedUserData: Partial<IUser>
): Promise<IUser> => {
  const user = await userRepository.findOneBy({ user_id });
  if (!user) {
    throw new Error(`User with id: ${user_id} not found.`);
  }
  userRepository.merge(user, updatedUserData);
  await userRepository.save(user);
  return user;
};

const deleteOneUser = async (user_id: number): Promise<{ message: string }> => {
  const deletedUser = await userRepository.delete({ user_id });
  if (deletedUser.affected === 0) {
    throw new Error(`User with id: ${user_id} not found.`);
  }
  return { message: `User with id: ${user_id} successfully deleted.` };
};

export default {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteOneUser,
};
