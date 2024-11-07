import { IUser, PaginatedResults, UserInput } from '../../types/types.js';
import { User } from '../entities/User.js';
import { AppDataSource } from '../ormconfig.js';
import bcrypt from 'bcrypt';

const userRepository = AppDataSource.getRepository(User);

const getUsers = async (page: number,
  limit: number): Promise<PaginatedResults<IUser>> => {
  const offset = (page - 1) * limit;

  const [users, total] = await userRepository.findAndCount({
    skip: offset,
    take: limit,
  });

  return {
    data: users,
    totalItems: total,
    currentPage: page,
    totalPages: Math.ceil(total / limit),
  };
}

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
  const existingUser = await userRepository.findOne({ where:[{userName, email}] });
  if (existingUser) {
    throw new Error(`Username or email already exists. Please choose a different username or email.`);
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = {
    userName,
    email,
    password: hashedPassword,
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
