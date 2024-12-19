import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Relation,
  ManyToOne,
} from 'typeorm';
import { Restaurant } from './Restaurant.js';
import { User } from './User.js';
import { Courier } from './Courier.js';

@Entity()
export class Notification {
  @PrimaryGeneratedColumn()
  notification_id: number;

  @Column()
  content: string;

  @ManyToOne(() => Restaurant)
  restaurant: Relation<Restaurant>;
  
  @ManyToOne(() => User)
  user: Relation<User>;

  @ManyToOne(() => Courier)
  courier: Relation<Courier>;
}
