import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { MenuItem } from './MenuItem.js';

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

  @Column()
  role: string;

  @OneToMany(() => MenuItem, (menuItem) => menuItem.restaurant)
  menu: MenuItem[];

  @Column({ type: 'bool', default: true, nullable: true })
  isOpen: boolean;
}
