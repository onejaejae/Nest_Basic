import { CatsRepository } from '../cats.repository';
import { CatRequestDto } from '../dtos/cats.request.dto';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Cat } from '../cats.schema';

@Injectable()
export class CatsService {
  constructor(private readonly catsRepository: CatsRepository) {}

  async getAllCat() {
    const allCat = await this.catsRepository.findAll();
    const readOnlyCats = allCat.map((cat) => cat.readOnlyData);
    return readOnlyCats;
  }

  async uploadImg(cat: Cat, files: Array<Express.Multer.File>) {
    const filename = `cats/${files[0].filename}`;

    const newCat = await this.catsRepository.findByIdAndUpdateImg(
      cat.id,
      filename,
    );

    return newCat;
  }

  async signUp(body: CatRequestDto) {
    const { email, password, name } = body;
    const isCatExist = await this.catsRepository.existByEmail(email);

    if (isCatExist) {
      // 403 error
      throw new UnauthorizedException('해당하는 고양이는 이미 존재합니다');
    }

    // password 암호화
    const hashedPassword = await bcrypt.hash(password, 10);
    const cat = await this.catsRepository.create({
      email,
      name,
      password: hashedPassword,
    });

    return cat.readOnlyData;
  }
}
