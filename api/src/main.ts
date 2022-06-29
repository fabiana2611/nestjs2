import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { MessagesModule } from "./messages/messages.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('API Restful Study')
    .setDescription('The API Project Description')
    .setVersion('1.0')
    .addTag('rest-api-study')
    //.addSecurity('bearer', { type: 'http', scheme: 'bearer' })
    // .addBearerAuth()
    // .addOAuth2()
    // .addCookieAuth('optional-session-id')
    .build();

  // Global doc
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // Multiple
  const msgDoc = SwaggerModule.createDocument(app, config, {
    include: [MessagesModule],
  });
  SwaggerModule.setup('api/messages', app, msgDoc);

  await app.listen(3000);
}
bootstrap();
