import { Entity, PrimaryGeneratedColumn, Column, OneToOne, CreateDateColumn, UpdateDateColumn, OneToMany, Relation } from 'typeorm';
import { User } from './User.js';
import { OrderItem } from './OrderItem.js';

@Entity()
export class Cart {
  @PrimaryGeneratedColumn()
  cart_id: number;

  @OneToOne(() => User)
  user: User;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.order)
  orderItems: Relation<OrderItem[]>;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn({ nullable: true })
  updatedAt: Date;
}