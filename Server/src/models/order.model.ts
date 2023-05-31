export enum statusMessage{
    not_picked_up="not picked up",
    ready_to_pick = "ready to pick",
    picked_up = "picked_up",
}

import { 
    PrimaryGeneratedColumn, 
    BaseEntity, 
    Entity, 
    Column, 
    OneToOne,
    JoinColumn,
    OneToMany
} from "typeorm";

import { Customer } from "./customer.model";
import { Order_item } from "./order_item.model";

@Entity({name : 'order'})
export class Order extends BaseEntity {
    @PrimaryGeneratedColumn()
    id : number;

    @OneToOne(() => Customer)
    @JoinColumn()
    customer : Customer;

    @Column({default : statusMessage.not_picked_up})
    status : string;

    @OneToMany(() => Order_item, order_item => order_item.order)
    order_item: Order_item[]

}