import {
  Controller,
  Get,
  Param,
  OnModuleInit,
  Post,
  Body,
  Delete,
  Patch,
} from '@nestjs/common';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import { Observable } from 'rxjs';

// Define las interfaces para los mensajes
interface CreateProductRequest {
  product_id: string;
  product_name: string;
  product_stock: number;
  product_price: number;
}

interface CreateProductResponse {
  product_id: string;
  product_name: string;
  product_stock: number;
  product_price: number;
}

interface GetProductResponse {
  product_id: string;
  product_name: string;
  product_stock: number;
  product_price: number;
}

interface UpdateProductRequest {
  product_name?: string;
  product_stock?: number;
  product_price?: number;
}

interface UpdateProductResponse {
  success: boolean; // Indica si la actualización fue exitosa
}

// Interface para eliminar un producto
interface DeleteProductResponse {
  success: boolean; // Indica si la eliminación fue exitosa
}

@Controller('products')
export class ProductController implements OnModuleInit {
  private client: ClientProxy;

  onModuleInit() {
    this.client = ClientProxyFactory.create({
      transport: Transport.NATS,
      options: {
        servers: ['nats://localhost:4222'], // Asegúrate de que esta URL coincida
      },
    });
  }

  @Get(':id')
  GetProduct(@Param('id') id: string): Observable<GetProductResponse> {
    return this.client.send<GetProductResponse, { id: string }>('GetProduct', {
      id,
    });
  }

  @Post()
  CreateProduct(
    @Body() productData: CreateProductRequest,
  ): Observable<CreateProductResponse> {
    return this.client.send<CreateProductResponse, CreateProductRequest>(
      'CreateProduct',
      productData,
    );
  }

  @Patch(':id')
  UpdateProduct(
    @Param('id') id: string,
    @Body() updateData: UpdateProductRequest,
  ): Observable<UpdateProductResponse> {
    return this.client.send<
      UpdateProductResponse,
      { id: string; data: UpdateProductRequest }
    >('UpdateProduct', { id, data: updateData });
  }

  @Delete(':id')
  DeleteProduct(@Param('id') id: string): Observable<DeleteProductResponse> {
    return this.client.send<DeleteProductResponse, { id: string }>(
      'DeleteProduct',
      { id },
    );
  }

  @Get()
  GetProducts(): Observable<GetProductResponse[]> {
    return this.client.send<GetProductResponse[]>('findAllProduct', {});
  }
}
