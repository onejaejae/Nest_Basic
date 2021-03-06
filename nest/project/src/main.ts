import { HttpExceptionFilter } from './common/exceptions/http-exception.filter';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as expressBasicAuth from 'express-basic-auth';
import * as path from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new HttpExceptionFilter());
  app.use(
    ['/docs', '/docs-json'],
    expressBasicAuth({
      challenge: true,
      users: { [process.env.SWAGGER_USER]: process.env.SWAGGER_PASSWORD },
    }),
  );

  // server에 있는 static file 제공
  // ex. http://localhost:8000/media/cats/aaa.png
  app.useStaticAssets(path.join(__dirname, './common', 'uploads'), {
    prefix: '/media',
  });

  // swagger 설정
  const config = new DocumentBuilder()
    .setTitle('C.I.C')
    .setDescription('Cat')
    .setVersion('1.0.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  // cors 설정
  app.enableCors({
    // origin은 배포시에는 특정 url을 써주는 것을 권장, true일 경우 모두 허용
    origin: true,
    credentials: true,
  });

  // 환경변수는 절대 노출이 되면 안된다.
  const PORT = process.env.PORT;
  await app.listen(PORT);
}
bootstrap();
