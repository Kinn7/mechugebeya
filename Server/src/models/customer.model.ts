import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';

@Entity({ name: 'customer' })
export class Customer extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;  

  @Column()
  lastName: string;

  @Column({unique : true})
  email: string;

  @Column({unique : true})
  phoneNumber: string;

  @Column()
  password: string;
}
