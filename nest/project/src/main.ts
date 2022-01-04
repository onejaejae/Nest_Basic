import { HttpExceptionFilter } from './common/exceptions/http-exception.filter';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new HttpExceptionFilter());

  // 환경변수는 절대 노출이 되면 안된다.
  const PORT = process.env.port;
  await app.listen(PORT);
}
bootstrap();
