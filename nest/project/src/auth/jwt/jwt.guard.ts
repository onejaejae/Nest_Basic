import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

// guard는 strategy가 자동으로 실행되도록 한다.
// 여기서는 jwt strategy이다.
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
