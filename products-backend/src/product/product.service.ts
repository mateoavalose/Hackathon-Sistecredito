import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { ProductHistory } from './entities/product-history.entity';
import {
  CreateProductRequest,
  CreateProductResponse,
  GetProductRequest,
  GetProductResponse,
} from './proto/product_pb';

@Injectable()
export class ProductService {
  constructor(
    // Inject the product repository
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    // Inject the product history repository
    @InjectRepository(ProductHistory)
    private readonly productHistoryRepository: Repository<ProductHistory>,
  ) {}

  async create(request: CreateProductRequest): Promise<CreateProductResponse> {
    const createProductDto: CreateProductDto = {
      product_id: request.product_id,
      product_name: request.product_name,
      product_stock: request.product_stock,
      product_price: request.product_price,
    };

    const product = this.productRepository.create(createProductDto);
    await this.productRepository.save(product);

    // Guardar el historial del producto
    await this.saveProductHistory(product);

    return {
      product_id: product.product_id,
      product_name: product.product_name,
      product_stock: product.product_stock,
      product_price: product.product_price,
    };
  }

  async findAll() {
    const products = await this.productRepository.find();
    return products;
  }

  async findOne(id: string) {
    console.log(`Buscando producto con ID: ${id}`);
    const product = await this.productRepository.findOneBy({ product_id: id });
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return product;
  }

  async getProduct(request: GetProductRequest): Promise<GetProductResponse> {
    const product = await this.findOne(request.id); // Utiliza el método findOne para obtener el producto
    return {
      product_id: product.product_id,
      product_name: product.product_name,
      product_stock: product.product_stock,
      product_price: product.product_price,
    };
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const product = await this.productRepository.preload({
      product_id: id,
      ...updateProductDto,
    });
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    await this.saveProductHistory(product);

    await this.productRepository.save(product);
    return product;
  }

  async remove(id: string) {
    const product = await this.findOne(id);
    await this.productRepository.delete(product);
    return product;
  }

  private async saveProductHistory(product: Product) {
    const history = new ProductHistory();
    history.product_id = product.product_id;
    history.product_stock = product.product_stock;
    history.product_price = product.product_price;
    await this.productHistoryRepository.save(history);
  }
}
