import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity('employee')
export class Employee {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({type: String})
  firstName: string;
  @Column({type: String})
  lastName: string;
  @Column({type: String})
  city: string;
}
