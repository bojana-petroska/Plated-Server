import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, Relation } from 'typeorm';
import { Restaurant } from './Restaurant.js';

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

  @Column()
  imageUrl: string;

  @Column({ type: 'bool', default: true })
  availability: boolean;

  @Column({ nullable: true })
  category: string;

  @ManyToOne(() => Restaurant, (restaurant) => restaurant.menu)
  restaurant: Relation<Restaurant>;
}
