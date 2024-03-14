import { NextFunction, Request, Response } from 'express';
import { createCategory, findAllCategories } from '../services/category.service';


export const getAllCategorysHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const categories = await findAllCategories();
    res.status(200).json({
      status: 'success',
      result: categories.length,
      data: {
        categories,
      },
    });
  } catch (err: any) {
    next(err);
  }
};

export const createCategoryHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
        const user = res.locals.user;        
        const category = await createCategory({
        name: req.body.name,
      });
  
      res.status(201).json({
        status: 'success',
        data: {
          category,
        },
      });
    } catch (err: any) {
      
      next(err);
    }
  };
