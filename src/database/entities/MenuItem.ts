import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, Relation, OneToMany } from 'typeorm';
import { Restaurant } from './Restaurant.js';
import { OrderItem } from './OrderItem.js';

@Entity('menu_items')
export class MenuItem {
  @PrimaryGeneratedColumn()
  menuItem_id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column("float")
  price: number;

  @Column({ nullable: true })
  imageUrl: string;

  @Column({ type: 'bool', default: true, nullable: true })
  availability: boolean;

  @Column({ nullable: true })
  category: string;

  @ManyToOne(() => Restaurant, (restaurant) => restaurant.menu)
  restaurant: Relation<Restaurant>;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.menuItem)
  orderItems: Relation<OrderItem[]>;
}
