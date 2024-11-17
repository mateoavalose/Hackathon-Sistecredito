import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Product } from './product.entity';

@Entity('product_history')
export class ProductHistory {
  @PrimaryGeneratedColumn('uuid')
  history_id: string;

  @Column()
  product_id: string;

  @Column('int')
  product_stock: number;

  @Column('float')
  product_price: number;

  @Column({ type: 'date', default: () => 'CURRENT_DATE' })
  date: Date;

  @ManyToOne(() => Product, (product) => product.history, {
    onDelete: 'NO ACTION',
  })
  @JoinColumn({ name: 'product_id' })
  product: Product;
}
