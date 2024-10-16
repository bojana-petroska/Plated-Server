import { Entity, ManyToOne, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Order } from './Order.js';
import { MenuItem } from './MenuItem.js';

@Entity()
export class OrderItem {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Order, (order) => order.orderItems)
  order: Order;

  @ManyToOne(() => MenuItem)
  menuItem: MenuItem;
 
  @Column()
  quantity: number;
}
