import {
  PrimaryGeneratedColumn,
  BaseEntity,
  Entity,
  Column,
  JoinColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';

import { Customer } from './customer.model';
import { Order_item } from './order_item.model';

export enum statusMessage {
  not_picked_up = 'not_picked_up',
  ready_to_pick = 'ready_to_pick',
  picked_up = 'picked_up',
}
export enum paymentStatusMessage {
  paid = 'paid',
  not_paid = 'not_paid',
}

@Entity({ name: 'order' })
export class Order extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Customer, (customer) => customer.order)
  @JoinColumn({
    name: 'customer',
  })
  customer: Customer;

  @Column({ default: paymentStatusMessage.not_paid })
  payment_status: string;

  @Column({ default: statusMessage.not_picked_up })
  status: string;

  @OneToMany(() => Order_item, (order_item) => order_item.order)
  order_item: Order_item[];
}
