import * as multer from 'multer';
import * as path from 'path';
import * as fs from 'fs';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';

const createFolder = (folder: string) => {
  try {
    console.log('💾 Create a root uploads folder...');

    // mkdirSync = 폴더를 만드는 명령어
    // path.join = 현재 폴더의 부모 폴더로 가서 업로드 폴더를 생성하라
    // 만약 업로드 폴더가 있다면 캐치 구문으로 가서에러 발생
    fs.mkdirSync(path.join(__dirname, '..', `uploads`));
  } catch (error) {
    console.log('The folder already exists...');
  }

  try {
    console.log(`💾 Create a ${folder} uploads folder...`);

    // path.join = 현재 폴더의 부모 폴더로 가서 그곳의 업로드 폴더의 folder 변수 값의 폴더를 생성하라
    fs.mkdirSync(path.join(__dirname, '..', `uploads/${folder}`));
  } catch (error) {
    console.log(`The ${folder} folder already exists...`);
  }
};

const storage = (folder: string): multer.StorageEngine => {
  createFolder(folder);

  return multer.diskStorage({
    destination(req, file, cb) {
      //* 어디에 저장할 지

      const folderName = path.join(__dirname, '..', `uploads/${folder}`);

      cb(null, folderName);
    },

    filename(req, file, cb) {
      //* 어떤 이름으로 올릴 지

      // extname = 파일의 확장자를 추출
      const ext = path.extname(file.originalname);

      // path.basename은 파일이름을 출력한다.
      // 만약 basename에 옵션값을 주게 되면 뒤의 확장자를 제거할 수도 있다.
      // 파일 이름의 중복을 방지하기 위해 Date.now()를 넣어줌
      const fileName = `${path.basename(
        file.originalname,

        ext,
      )}${Date.now()}${ext}`;

      cb(null, fileName);
    },
  });
};

export const multerOptions = (folder: string) => {
  const result: MulterOptions = {
    storage: storage(folder),
  };

  return result;
};
