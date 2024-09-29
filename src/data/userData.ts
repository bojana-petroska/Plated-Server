import { IUser, UserInput } from '../types/userTypes';

let users: IUser[] = [
  {
    id: 1,
    userName: 'bo',
    email: 'bo@gmail.com',
    password: '123',
    address: 'berlin 12, 12055',
    phoneNumber: '1234',
  },
  {
    id: 2,
    userName: 'nikita',
    email: 'nikita@gmail.com',
    password: '123',
    address: 'berlin 12, 12055',
    phoneNumber: '1234',
  },
  {
    id: 3,
    userName: 'elena',
    email: 'elena@gmail.com',
    password: '123',
    address: 'berlin 12, 12055',
    phoneNumber: '1234',
  },
];

const getUsers = () => users;

const getUser = (id: number) => users.find((user) => user.id === id);

const createUser = ({ userName, email, password }: UserInput) => {
  const newUser = {
    id: Math.floor(Math.random() * 1000),
    userName,
    email,
    password,
    address: '',
    phoneNumber: '',
    createdAt: new Date(),
  };
  users.push(newUser);
  return newUser;
};

const updateUser = (
  id: number,
  updatedUserData: Partial<IUser>
): IUser | undefined => {
  const userIndex = users.findIndex((user) => user.id === id);
  if (userIndex === -1) {
    return undefined;
  }
  users[userIndex] = { ...users[userIndex], ...updatedUserData };

  return users[userIndex];
};

const deleteUser = (id: number) => {
  const userIndex = users.findIndex((user) => user.id === id);
  if (userIndex >= 0) {
    const user = users[userIndex];
    users.splice(userIndex, 1);
    return user;
  }
  return null;
};

export default {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
};
