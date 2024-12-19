import {
    Entity,
    PrimaryGeneratedColumn,
    Relation,
    CreateDateColumn,
    ManyToOne,
    OneToOne,
  } from 'typeorm';
import { User } from './User.js';
import { Cart } from './Cart.js';

  @Entity()
  export class Payment {
    @PrimaryGeneratedColumn()
    payment_id: number;

    @CreateDateColumn()
    createdAt: Date;

    @ManyToOne(() => User, { nullable: false })
    user: Relation<User>

    @OneToOne(() => Cart, { nullable: false })
    cart: Relation<Cart>
  }