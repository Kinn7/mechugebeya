import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Category } from './category.model';
import { Order_item } from './order_item.model';

@Entity({ name: 'products' })
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('decimal', { precision: 5, scale: 2 })
  price: number;

  @Column()
  expiry_date: Date;

  @Column()
  quantity: number;

  @Column()
  image: string;

  // @OneToMany(() => Category, (category) => category.product, {
  //   onDelete: 'CASCADE',
  // })
  // @JoinColumn({
  //   name: 'id',
  // })
  // categoryID: Category[];
  @ManyToOne(() => Category, category => category.categoryId, {
    onDelete: 'CASCADE'
  } )
  category : Category;


  @OneToMany(() => Order_item, (order_item) => order_item.product)
  order_item: Order_item[];

}
