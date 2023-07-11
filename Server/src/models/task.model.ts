import {
  PrimaryGeneratedColumn,
  BaseEntity,
  Entity,
  OneToOne,
  JoinColumn,
  ManyToOne,
  Column,
} from 'typeorm';
import { Order } from './order.model';
import { Assistant } from './assistant.model';
export enum taskCompletionMessage {
  complete = 'complete',
  incomplete = 'incomplete',
}
@Entity({ name: 'task' })
export class Task extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => Order)
  @JoinColumn()
  order: Order;

  @ManyToOne(() => Assistant, (assistant) => assistant.tasks)
  @JoinColumn()
  assistant: Assistant;

  @Column({ default: taskCompletionMessage.incomplete })
  status: string;
}
