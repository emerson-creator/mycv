import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  AfterInsert,
  AfterRemove,
  AfterUpdate,
  OneToMany,
} from 'typeorm';
import { Report } from '../reports/reports.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @AfterInsert()
  logInsert() {
    console.log(`User with ID ${this.id} has been inserted.`);
  }

  @AfterUpdate()
  logUpdate() {
    console.log(`User with ID ${this.id} has been updated.`);
  }

  @Column({ default: true })
  isAdmin: boolean;

  @AfterRemove()
  logRemove() {
    console.log(`User with ID ${this.id} has been removed.`);
  }

  @OneToMany(() => Report, (report) => report.user)
  reports: Report[];
}
