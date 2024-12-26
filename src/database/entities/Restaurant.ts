import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  Relation,
} from 'typeorm';
import { MenuItem } from './MenuItem.js';
import { Order } from './Order.js';
import { Courier } from './Courier.js';
import { Notification } from './Notification.js';

@Entity()
export class Restaurant {
  @PrimaryGeneratedColumn()
  restaurant_id: number;

  @Column()
  name: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  token: string;

  @Column({ nullable: true })
  refreshToken: string;

  @Column({ nullable: true })
  address: string;

  @Column({ nullable: true })
  phoneNumber: string;

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  openingHours: string;

  @Column({ type: 'int', nullable: true })
  deliveryRadius: number;

  @Column({ type: 'bool', default: true, nullable: true })
  isOpen: boolean;

  @Column({ nullable: true })
  rating: number;

  @Column({ nullable: true })
  imageUrl: string;

  @OneToMany(() => MenuItem, (menuItem) => menuItem.restaurant, {
    cascade: true,
  })
  menu: Relation<MenuItem[]>;

  @OneToMany(() => Order, (order) => order.restaurant, { cascade: true })
  orders: Relation<Order[]>;

  @OneToMany(() => Courier, (courier) => courier.restaurant, { cascade: true })
  couriers: Relation<Courier[]>;

  @OneToMany(() => Notification, (notification) => notification.restaurant, {
    cascade: true,
  })
  notifications: Relation<Notification[]>;
}
