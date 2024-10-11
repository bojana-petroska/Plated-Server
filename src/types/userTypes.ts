export interface IUser {
  id?: number;
  userName: string;
  email: string;
  password: string;
  address: string;
  phoneNumber: string;
  orderHistory?: Array<string>;
  role?: string;
  createdAt?: Date;
}

export type UserInput = Pick<IUser, 'userName' | 'email' | 'password'>;
