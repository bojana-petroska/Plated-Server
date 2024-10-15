import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  user_id: number;

  @Column()
  userName: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  address: string;

  @Column()
  phoneNumber: string;

  @Column({ type: 'simple-array', nullable: true })
  orderHistory: string[];

  @Column({ nullable: true })
  role: string;

  @CreateDateColumn({ type: 'timestamp', nullable: true })
  createdAt: Date;
}
