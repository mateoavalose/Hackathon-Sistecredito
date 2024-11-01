import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @MessagePattern('CreateProduct')
  create(@Payload() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @MessagePattern('findAllProduct')
  findAll() {
    return this.productService.findAll();
  }

  @MessagePattern('GetProduct')
  findOne(@Payload() payload: { id: string }) {
    console.log(`Buscando producto con ID: ${payload.id}`);
    return this.productService.findOne(payload.id);
  }

  @MessagePattern('updateProduct')
  update(@Payload() updateProductDto: UpdateProductDto) {
    return this.productService.update(
      updateProductDto.product_id,
      updateProductDto,
    );
  }

  @MessagePattern('removeProduct')
  remove(@Payload() id: string) {
    return this.productService.remove(id);
  }
}
