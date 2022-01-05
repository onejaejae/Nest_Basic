import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

// class 사용 이유

/*
1. 데코레이터 사용
2. 상속을 통한 재사용성 가능
 */

export class CatRequestDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
