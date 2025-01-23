import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  OneToMany,
  Relation,
  UpdateDateColumn,
  OneToOne,
} from 'typeorm';
import { Order } from './Order.js';
import { Payment } from './Payment.js';
import { Notification } from './Notification.js'
import { Cart } from './Cart.js';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  user_id: number;

  @Column()
  userName: string;

  @Column({ nullable: true })
  firstName: string;

  @Column({ nullable: true })
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: false })
  password: string;

  @Column({ nullable: true })
  token: string;

  @Column({ nullable: true })
  refreshToken: string;

  @Column()
  address: string;

  @Column()
  phoneNumber: string;

  @Column({ nullable: true })
  profilePicture: string;

  @Column({ nullable: true })
  role: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn({ nullable: true })
  updatedAt: Date;

  @OneToMany(() => Order, (order) => order.user, { cascade: true })
  orders: Relation<Order[]>;

  @OneToMany(() => Payment, (payment) => payment.user, { cascade: true })
  payments: Relation<Payment[]>;

  @OneToMany(() => Notification, (notification) => notification.user, {
    cascade: true,
  })
  notifications: Relation<Notification[]>;

  @OneToMany(() => Cart, (cart) => cart.user, { cascade: true })
  carts: Relation<Cart[]>;
}
