import { 
    BaseEntity, 
    Entity, 
    PrimaryGeneratedColumn, 
    ManyToMany,
    Column,
    JoinColumn, 
    ManyToOne} from "typeorm";

    import { Order } from "./order.model";
    import { Product } from "./product.model";

@Entity({name : 'order_item'})
export class Order_item extends BaseEntity{
    @PrimaryGeneratedColumn()
    id : number;

    @ManyToOne(() => Order, (order) => order.id)
    order: Order

    @ManyToOne(() => Product, (product) => product.id)
    product: Product
    
    @Column()
    quantity : number;


}