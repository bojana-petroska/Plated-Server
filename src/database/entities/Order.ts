import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  OneToMany,
  UpdateDateColumn,
  Relation,
} from 'typeorm';
import { User } from './User.js';
import { Restaurant } from './Restaurant.js';
import { OrderItem } from './OrderItem.js';
import { OrderStatus } from '../../types/types.js';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  order_id: number;

  @Column()
  userId: number;

  @ManyToOne(() => User)
  user: Relation<User>;

  @Column()
  restaurantId: number;

  @ManyToOne(() => Restaurant)
  restaurant: Relation<Restaurant>;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.order, { cascade: true })
  orderItems: Relation<OrderItem[]>;

  @Column({ type: 'float' })
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
