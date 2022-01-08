import { LoggerMiddleware } from './common/middlewares/logger.middleware';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { CommentsModule } from './comments/comments.module';
import * as mongoose from 'mongoose';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_URL, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    }),
    CatsModule,
    AuthModule,
    CommentsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  private readonly isDev: boolean = process.env.mode === 'dev' ? true : false;

  configure(consumer: MiddlewareConsumer) {
    // forRoutes('*')일 경우 전체 router에 적용된다
    consumer.apply(LoggerMiddleware).forRoutes('*');

    // production시 false로 설정
    mongoose.set('debug', this.isDev);
  }
}
