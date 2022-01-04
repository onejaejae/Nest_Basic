import { HttpExceptionFilter } from '../common/exceptions/http-exception.filter';
import { CatsService } from './cats.service';
import {
  Controller,
  Get,
  Post,
  UseFilters,
  UseInterceptors,
} from '@nestjs/common';
import { SuccessInterceptor } from 'src/common/interceptors/success.intercept';

@Controller('cats')
@UseInterceptors(SuccessInterceptor)
@UseFilters(HttpExceptionFilter)
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Get()
  getCurrentCat() {
    // express error 처리 => throw new Error()
    // nest error 처리 => throw new HttpException('api is broken', 401);
    return 'current cat';
  }

  @Post('login')
  signUp() {
    return 'signUp';
  }

  @Post('login')
  login() {
    return 'login cat';
  }

  @Post('logout')
  logout() {
    return 'logout cat';
  }

  @Post('upload/cats')
  uploadCatImg() {
    return 'upload cat';
  }
}
