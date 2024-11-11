import { IUser, PaginatedResults, UserInput } from '../../types/types.js';
import { User } from '../entities/User.js';
import { AppDataSource } from '../ormconfig.js';
import bcrypt from 'bcrypt';
import authController from '../../controllers/authController.js';

const userRepository = AppDataSource.getRepository(User);

const getUsers = async (
  page: number,
  limit: number
): Promise<PaginatedResults<IUser>> => {
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
};

const getUser = async (user_id: number): Promise<IUser> => {
  const user = await userRepository.findOneBy({ user_id });
  if (!user) {
    throw new Error(`User with id: ${user_id} not found.`);
  }
  return user;
};

// const createUser = async ({
//   userName,
//   email,
//   password,
// }: UserInput): Promise<{
//   user: IUser;
//   token: string;
//   refreshToken: string;
// }> => {
//   const existingUser = await userRepository.findOne({
//     where: [{ userName }, { email }],
//   });
//   if (existingUser) {
//     throw new Error(
//       'Username or email already exists. Please choose a different one.'
//     );
//   }
//   console.log(JWT_SECRET);
//   const hashedPassword = await bcrypt.hash(password, 10);

//   const newUser = userRepository.create({
//     userName,
//     email,
//     password: hashedPassword,
//     address: '',
//     phoneNumber: '',
//     createdAt: new Date(),
//   });

//   const savedUser = await userRepository.save(newUser);

//   // Generate tokens
//   if (!JWT_SECRET || !JWT_REFRESH_SECRET) {
//     throw new Error(
//       'Missing JWT secrets. Please set JWT_SECRET and JWT_REFRESH_SECRET environment variables.'
//     );
//   }
//   const token = authController.generateAccessToken({
//     user: savedUser,
//     JWT_SECRET,
//   });
//   console.log(token);
//   const refreshToken = authController.generateRefreshToken({
//     user: savedUser,
//     JWT_REFRESH_SECRET,
//   });

//   // Save refresh token to user record
//   savedUser.token = token;
//   savedUser.refreshToken = refreshToken;
//   await userRepository.save(savedUser);

//   return { user: savedUser, token, refreshToken };
// };

const createUser = async ({ userName, email, password }: UserInput): Promise<IUser> => {
  const existingUser = await userRepository.findOne({ where: [{ userName }, { email }] });
  
  if (existingUser) {
    throw new Error('Username or email already exists.');
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  console.log('hashed password!:', hashedPassword);

  const newUser = userRepository.create({
    userName,
    email,
    password: hashedPassword,
    address: '',
    phoneNumber: '',
    token: '',
    refreshToken: '',
    createdAt: new Date(),
  });

  console.log(newUser)
  return await userRepository.save(newUser);
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
