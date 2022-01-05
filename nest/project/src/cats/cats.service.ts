import { CatRequestDto } from './dto/cats.request.dto';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cat } from './cats.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class CatsService {
  constructor(@InjectModel(Cat.name) private catModel: Model<Cat>) {}
  async signUp(body: CatRequestDto) {
    const { email, password, name } = body;
    const isCatExist = await this.catModel.exists({ email });

    if (isCatExist) {
      // 403 error
      throw new UnauthorizedException('해당하는 고양이는 이미 존재합니다');
    }

    // password 암호화
    const hashedPassword = await bcrypt.hash(password, 10);
    const cat = await this.catModel.create({
      email,
      name,
      password: hashedPassword,
    });

    return cat.readOnlyData;
  }
}
