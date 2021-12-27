import { Cat, catType } from "./cats.model";
import { Request, Response } from "express";

//* READ 고양이 전체 데이터 조회
export const readAllCats = (req: Request, res: Response) => {
  try {
    const cats: catType[] = Cat;
    res.status(200).send({
      success: true,
      data: { cats },
    });
  } catch (error: any) {
    res.status(400).send({
      success: false,
      error: error.message,
    });
  }
};

//* READ 특정 고양이 데이터 조회
export const readCat = (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const cat: catType | undefined = Cat.find((cat) => cat.id === id);
    res.status(200).send({ success: true, data: { cat } });
  } catch (error: any) {
    res.status(400).send({
      success: false,
      error: error.message,
    });
  }
};

//* CREATE 새로운 고양이 추가
export const createCat = (req: Request, res: Response) => {
  try {
    const data = req.body;
    console.log(data);

    Cat.push(data);
    res.status(200).send({ success: true, data: { data } });
  } catch (error: any) {
    res.status(400).send({
      success: false,
      error: error.message,
    });
  }
};

//* UPDATE 고양이 데이터 업데이트 -> PUT
export const updateCat = (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    let cat: catType | undefined = Cat.find((cat) => cat.id === id);
    cat = req.body;

    console.log(cat);

    res.status(200).send({ success: true, data: { cat } });
  } catch (error: any) {
    res.status(400).send({
      success: false,
      error: error.message,
    });
  }
};

//* UPDATE 고양이 데이터 부분적으로 업데이트 -> PATCH
export const updatePartialCat = (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    let result;

    let cat = Cat.forEach((cat) => {
      if (cat.id === id) {
        cat = { ...cat, ...req.body };
        result = cat;
      }
    });

    res.status(200).send({ success: true, data: { result } });
  } catch (error: any) {
    res.status(400).send({
      success: false,
      error: error.message,
    });
  }
};

//* DELETE 고양이 데이터 삭제 -> DELETE
export const deleteCat = (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const newCats: catType[] = Cat.filter((cat) => cat.id !== id);
    res.status(200).send({ success: true, data: { newCats } });
  } catch (error: any) {
    res.status(400).send({
      success: false,
      error: error.message,
    });
  }
};
