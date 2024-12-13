import { Entity, ManyToOne, PrimaryGeneratedColumn, Column, Relation } from 'typeorm';
import { Order } from './Order.js';
import { MenuItem } from './MenuItem.js';

@Entity()
export class OrderItem {
  @PrimaryGeneratedColumn()
  orderItem_id: number;

  @ManyToOne(() => Order, (order) => order.orderItems)
  order: Relation<Order>;

  @ManyToOne(() => MenuItem, (menuItem) => menuItem.orderItems)
  menuItem: Relation<MenuItem>;

  // @ManyToOne(() => Cart, (menuItem) => menuItem.orderItems)
  // menuItem: Relation<MenuItem>;
 
  @Column()
  quantity: number;
}
