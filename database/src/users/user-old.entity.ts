import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UserOld {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  completeName: string;

  @Column()
  age: number;
}
