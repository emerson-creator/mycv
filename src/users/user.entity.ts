import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  AfterInsert,
  AfterRemove,
  AfterUpdate,
} from 'typeorm';

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

  @AfterRemove()
  logRemove() {
    console.log(`User with ID ${this.id} has been removed.`);
  }
}
