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

  @Column({ type: 'int', nullable: true  })
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
