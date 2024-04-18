import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Set the global prefix for all routes
  app.setGlobalPrefix('api');

  const config = new DocumentBuilder()
    .setTitle('API')
    .setDescription('The API description')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header'
      },
      'JWT', // This is the name of the key that will be used internally by Swagger.
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);

  // Setup Swagger at the /api/docs path
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(3001);
}
bootstrap();
