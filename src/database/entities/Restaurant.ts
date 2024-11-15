import { Entity, Column, PrimaryGeneratedColumn, OneToMany, Relation } from 'typeorm';
import { MenuItem } from './MenuItem.js';
import { Order } from './Order.js';

@Entity()
export class Restaurant {
  @PrimaryGeneratedColumn()
  restaurant_id: number;

  @Column()
  name: string;

  @Column()
  password: string;

  @Column()
  address: string;

  @Column()
  phoneNumber: string;

  @Column()
  email: string;

  @Column()
  openingHours: string;

  @Column({ type: 'int' })
  deliveryRadius: number;

  @Column({ nullable: true })
  role: string;

  @OneToMany(() => MenuItem, (menuItem) => menuItem.restaurant)
  menu: Relation<MenuItem[]>;

  @Column({ type: 'bool', default: true, nullable: true })
  isOpen: boolean;

  @OneToMany(() => Order, (order) => order.restaurant, { cascade: true })
  orders: Relation<Order[]>;
}
