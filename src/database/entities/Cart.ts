import {
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  Relation,
  ManyToOne,
} from 'typeorm';
import { User } from './User.js';
import { OrderItem } from './OrderItem.js';
import { Payment } from './Payment.js';
import { Order } from './Order.js';

@Entity()
export class Cart {
  @PrimaryGeneratedColumn()
  cart_id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn({ nullable: true })
  updatedAt: Date;

  @ManyToOne(() => User, { nullable: false })
  user: Relation<User>;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.cart, { cascade: true })
  orderItems: Relation<OrderItem[]>;

  @OneToOne(() => Payment, { cascade: true })
  payment: Relation<Payment>;

  @OneToMany(() => Order, (order) => order.cart, {
    cascade: true,
    nullable: true,
  })
  order: Relation<Order[]>;
}
