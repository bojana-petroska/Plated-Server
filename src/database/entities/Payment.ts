import {
    Entity,
    PrimaryGeneratedColumn,
    Relation,
    CreateDateColumn,
    ManyToOne,
    OneToOne,
    Column,
  } from 'typeorm';
import { User } from './User.js';
import { Cart } from './Cart.js';

  @Entity()
  export class Payment {
    @PrimaryGeneratedColumn()
    payment_id: number;

    @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
    amount: number;

    @Column({ nullable: true })
    currency: string;

    @CreateDateColumn()
    createdAt: Date;

    @ManyToOne(() => User, { nullable: false })
    user: Relation<User>

    @OneToOne(() => Cart, { nullable: false })
    cart: Relation<Cart>
  }