import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Habilitar CORS en el API Gateway
  app.enableCors({
    origin: 'http://localhost:5173', // Cambia según el origen permitido
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    credentials: true,
  });

  await app.listen(3000);
}
bootstrap();
