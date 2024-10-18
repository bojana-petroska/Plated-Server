import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  OneToMany,
  Relation,
} from 'typeorm';
import { Order } from './Order.js';
import { IOrder } from '../../types/types.js';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  user_id: number;

  @Column()
  userName: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  address: string;

  @Column()
  phoneNumber: string;

  @Column({ type: 'simple-array', nullable: true })
  orderHistory: IOrder[];

  @Column({ nullable: true })
  role: string;

  @CreateDateColumn({ type: 'timestamp', nullable: true })
  createdAt: Date;

  @OneToMany(() => Order, (order) => order.user)
  orders: Relation<Order[]>;
}
