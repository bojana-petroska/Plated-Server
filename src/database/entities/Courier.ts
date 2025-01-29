import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  Relation,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { Availability } from '../../types/types.js';
import { Restaurant } from './Restaurant.js';
import { Notification } from './Notification.js';

@Entity()
export class Courier {
  @PrimaryGeneratedColumn()
  courier_id: number;

  @Column()
  name: string;

  @Column()
  password: string;

  @Column({ unique: true })
  email: string;

  @Column()
  phoneNumber: string;

  @Column({
    type: 'enum',
    enum: Availability,
    default: Availability.available,
  })
  availability: Availability;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn({ nullable: true })
  updatedAt: Date;

  @ManyToOne(() => Restaurant, { nullable: true })
  restaurant: Relation<Restaurant>;

  @OneToMany(() => Notification, (notification) => notification.courier, {
    cascade: true,
  })
  notifications: Relation<Notification[]>;
}
