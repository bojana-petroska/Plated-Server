import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  ManyToMany,
  OneToMany,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './User.js';
import { Restaurant } from './Restaurant.js';
import { OrderItem } from './OrderItem.js';
import { OrderStatus } from '../../types/types.js';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  order_id: number;

  @ManyToOne(() => User)
  user: User;

  @ManyToOne(() => Restaurant)
  restaurant: Restaurant;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.order)
  orderItems: OrderItem[];

  @Column()
  totalPrice: number;

  @Column({
    type: 'enum',
    enum: OrderStatus,
    default: OrderStatus.pending,
  })
  status: OrderStatus;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn({ nullable: true })
  updatedAt: Date;
}
