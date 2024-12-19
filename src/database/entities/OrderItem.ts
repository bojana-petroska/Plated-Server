import {
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Column,
  Relation,
} from 'typeorm';
import { Order } from './Order.js';
import { MenuItem } from './MenuItem.js';
import { Cart } from './Cart.js';

@Entity()
export class OrderItem {
  @PrimaryGeneratedColumn()
  orderItem_id: number;

  @Column()
  quantity: number;

  @ManyToOne(() => Order)
  order: Relation<Order>;

  @ManyToOne(() => MenuItem, { nullable: false })
  menuItem: Relation<MenuItem>;

  @ManyToOne(() => Cart)
  cart: Relation<Cart>;

}
