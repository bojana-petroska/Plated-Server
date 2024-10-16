import { Entity, ManyToOne, PrimaryGeneratedColumn, Column, OneToOne, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { User } from './User.js';
import { OrderItem } from './OrderItem.js';

@Entity()
export class Cart {
  @PrimaryGeneratedColumn()
  cart_id: number;

  @OneToOne(() => User)
  user: User;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.order)
  orderItems: OrderItem[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn({ nullable: true })
  updatedAt: Date;
}