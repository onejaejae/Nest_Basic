import { CurrentUser } from './../common/decorators/user.decorator';
import { JwtAuthGuard } from './../auth/jwt/jwt.guard';
import { LoginRequestDto } from './../auth/dto/login.request.dto';
import { AuthService } from './../auth/auth.service';
import { ReadOnlyCatDto } from './dto/cat.dto';
import { HttpExceptionFilter } from '../common/exceptions/http-exception.filter';
import { CatsService } from './cats.service';
import {
  Body,
  Controller,
  Get,
  Post,
  UseFilters,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { SuccessInterceptor } from 'src/common/interceptors/success.intercept';
import { CatRequestDto } from './dto/cats.request.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Cat } from './cats.schema';

@Controller('cats')
@UseInterceptors(SuccessInterceptor)
@UseFilters(HttpExceptionFilter)
export class CatsController {
  constructor(
    private readonly catsService: CatsService,
    private readonly authService: AuthService,
  ) {}

  @ApiOperation({ summary: '현재 고양이 가져오기' })
  @Get()
  //@UseGuard(JwtAuthGuard)로 데코레이팅된 컨트롤러가 실행되면
  //JwtAuthGuard는 자동으로 PassportStrategy를 상속받은 JwtStrategy를 찾아서
  // 로직을 수행합니다.
  @UseGuards(JwtAuthGuard)
  // Custom decorator를 사용하여 한 단계 더 추상화를 진행
  getCurrentCat(@CurrentUser() cat: Cat) {
    // express error 처리 => throw new Error()
    // nest error 처리 => throw new HttpException('api is broken', 401);

    return cat.readOnlyData;
  }

  @ApiResponse({ status: 500, description: 'Server Error...' })
  @ApiResponse({ status: 201, description: '성공!', type: ReadOnlyCatDto })
  @ApiOperation({ summary: '회원가입' })
  @Post()
  async signUp(@Body() body: CatRequestDto) {
    return await this.catsService.signUp(body);
  }

  @ApiOperation({ summary: '로그인' })
  @Post('login')
  login(@Body() data: LoginRequestDto) {
    return this.authService.jwtLogin(data);
  }

  // JWT 자체를 프론트엔드단에서 없애버리면
  // 로그아웃이 자동으로 되기떄문에
  // 백엔드단에서 로그아웃 기능을 구현하지 않아도 된다.
  @ApiOperation({ summary: '로그아웃' })
  @Post('logout')
  logout() {
    return 'logout cat';
  }

  @ApiOperation({ summary: '고양이 이미지 업로드' })
  @Post('upload/cats')
  uploadCatImg() {
    return 'upload cat';
  }
}
