import { PickType } from '@nestjs/swagger';
import { Cat } from '../cats.schema';

// class 사용 이유

/*
1. 데코레이터 사용
2. 상속을 통한 재사용성 가능
 */

export class CatRequestDto extends PickType(Cat, [
  'email',
  'name',
  'password',
] as const) {}
