import { ApiProperty, PickType } from '@nestjs/swagger';
import { Cat } from '../cats.schema';

// 상속을 받게 되면 Paaword도 나타나게 되는데 ReadOnlyCatDto에서는
// password 속성이 불필요하다. 이에 대한 해결책은?
// "PickType"를 사용하여 해결, "PickType"으로 필요한 것만 빼온다.

export class ReadOnlyCatDto extends PickType(Cat, ['email', 'name'] as const) {
  @ApiProperty({
    example: '3021967',
    description: 'id',
  })
  id: string;
}
