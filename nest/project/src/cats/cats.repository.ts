import { CatRequestDto } from './dtos/cats.request.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Cat } from './cats.schema';
import { Model, Types } from 'mongoose';
import * as mongoose from 'mongoose';
import { CommentsSchema } from 'src/comments/comments.schema';

// Repository를 사용하기 위해 cats module의 provider에 추가
@Injectable()
export class CatsRepository {
  constructor(@InjectModel(Cat.name) private readonly catModel: Model<Cat>) {}

  async findAll() {
    const CommentsModel = mongoose.model('comments', CommentsSchema);
    const result = await this.catModel
      .find()
      .populate('comments', CommentsModel);

    return result;
  }

  async findByIdAndUpdateImg(id: string, filename: string) {
    const cat = await this.catModel.findById(id);

    cat.imgUrl = filename;
    const newCat = await cat.save();

    return newCat.readOnlyData;
  }

  // request.user에 저장할 떄 Password 필드는
  // 제외하고 저장하는 것이 보안상 좋다
  async findCatByIdWithoutPassword(
    catId: string | Types.ObjectId,
  ): Promise<Cat | null> {
    const cat = await this.catModel.findById(catId).select('-password');

    return cat;
  }

  async findCatByEmail(email: string): Promise<Cat | null> {
    const cat = await this.catModel.findOne({ email });
    return cat;
  }

  async existByEmail(email: string): Promise<boolean> {
    return await this.catModel.exists({ email });
  }

  async create(cat: CatRequestDto): Promise<Cat> {
    return await this.catModel.create(cat);
  }
}
