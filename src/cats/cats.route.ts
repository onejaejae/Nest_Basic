import express from "express";
import { Cat, catType } from "./cats.model";
import {
  createCat,
  deleteCat,
  readAllCats,
  readCat,
  updateCat,
  updatePartialCat,
} from "./cats.service";

const catsRouter = express.Router();

//* READ 고양이 전체 데이터 조회
catsRouter.get("/cats", readAllCats);

//* READ 특정 고양이 데이터 조회
catsRouter.get("/cats/:id", readCat);

//* CREATE 새로운 고양이 추가
catsRouter.post("/cats", createCat);

//* UPDATE 고양이 데이터 업데이트 -> PUT
catsRouter.put("/cats/:id", updateCat);

//* UPDATE 고양이 데이터 부분적으로 업데이트 -> PATCH
catsRouter.patch("/cats/:id", updatePartialCat);

//* DELETE 고양이 데이터 삭제 -> DELETE
catsRouter.delete("/cats/:id", deleteCat);

export default catsRouter;
