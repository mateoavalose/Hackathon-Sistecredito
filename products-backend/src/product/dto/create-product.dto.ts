import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
} from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  product_id: string;

  @IsString()
  @IsNotEmpty()
  product_name: string;

  @IsInt()
  @IsPositive()
  product_stock: number;

  @IsNumber()
  @IsPositive()
  product_price: number;
}
