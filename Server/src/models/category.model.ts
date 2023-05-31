import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { Product } from './product.model';

@Entity({ name: 'category' })
export class Category extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;



  // @ManyToOne(() => Product, (product) => product.categoryID)
  // product: Product;
  @OneToMany(() => Product, (product) => product.category )
    categoryId : Category[];
  
}
