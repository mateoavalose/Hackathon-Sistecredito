import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';
import {
  IsInt,
  IsOptional,
  IsString,
  IsNumber,
  IsPositive,
} from 'class-validator';

export class UpdateProductDto extends PartialType(CreateProductDto) {
  @IsOptional()
  @IsString()
  product_id?: string;

  @IsOptional()
  @IsString()
  product_name?: string;

  @IsOptional()
  @IsInt()
  @IsPositive()
  product_stock?: number;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  product_price?: number;
}
