import * as multer from 'multer';
import * as path from 'path';
import * as fs from 'fs';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';

const createFolder = (folder: string) => {
  try {
    console.log('๐พ Create a root uploads folder...');

    // mkdirSync = ํด๋๋ฅผ ๋ง๋๋ ๋ช๋ น์ด
    // path.join = ํ์ฌ ํด๋์ ๋ถ๋ชจ ํด๋๋ก ๊ฐ์ ์๋ก๋ ํด๋๋ฅผ ์์ฑํ๋ผ
    // ๋ง์ฝ ์๋ก๋ ํด๋๊ฐ ์๋ค๋ฉด ์บ์น ๊ตฌ๋ฌธ์ผ๋ก ๊ฐ์์๋ฌ ๋ฐ์
    fs.mkdirSync(path.join(__dirname, '..', `uploads`));
  } catch (error) {
    console.log('The folder already exists...');
  }

  try {
    console.log(`๐พ Create a ${folder} uploads folder...`);

    // path.join = ํ์ฌ ํด๋์ ๋ถ๋ชจ ํด๋๋ก ๊ฐ์ ๊ทธ๊ณณ์ ์๋ก๋ ํด๋์ folder ๋ณ์ ๊ฐ์ ํด๋๋ฅผ ์์ฑํ๋ผ
    fs.mkdirSync(path.join(__dirname, '..', `uploads/${folder}`));
  } catch (error) {
    console.log(`The ${folder} folder already exists...`);
  }
};

const storage = (folder: string): multer.StorageEngine => {
  createFolder(folder);

  return multer.diskStorage({
    destination(req, file, cb) {
      //* ์ด๋์ ์ ์ฅํ  ์ง

      const folderName = path.join(__dirname, '..', `uploads/${folder}`);

      cb(null, folderName);
    },

    filename(req, file, cb) {
      //* ์ด๋ค ์ด๋ฆ์ผ๋ก ์ฌ๋ฆด ์ง

      // extname = ํ์ผ์ ํ์ฅ์๋ฅผ ์ถ์ถ
      const ext = path.extname(file.originalname);

      // path.basename์ ํ์ผ์ด๋ฆ์ ์ถ๋ ฅํ๋ค.
      // ๋ง์ฝ basename์ ์ต์๊ฐ์ ์ฃผ๊ฒ ๋๋ฉด ๋ค์ ํ์ฅ์๋ฅผ ์ ๊ฑฐํ  ์๋ ์๋ค.
      // ํ์ผ ์ด๋ฆ์ ์ค๋ณต์ ๋ฐฉ์งํ๊ธฐ ์ํด Date.now()๋ฅผ ๋ฃ์ด์ค
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
