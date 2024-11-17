import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { ProductHistory } from './product-history.entity';

@Entity('products')
export class Product {
  @PrimaryColumn()
  product_id: string;

  @Column('text', { unique: true })
  product_name: string;

  @Column('int', { default: 0 })
  product_stock: number;

  @Column('float', { default: 0 })
  product_price: number;

  @Column('boolean', { default: false })
  is_deleted: boolean;

  @OneToMany(() => ProductHistory, (history) => history.product)
  history: ProductHistory[];
}
