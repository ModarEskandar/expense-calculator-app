import { NextFunction, Request, Response } from 'express';
import { createExpense, deleteExpense, findAllExpenses, findExpenseById, updateExpense } from '../services/expense.service';
import { CreateExpenseInput, UpdateExpenseInput } from '../schema/expense.schema';


export const getAllExpensesHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const limit = parseInt((req.query.limit??0) as string);
    const user = res.locals.user;
    const query = { user: user }
    const options = req.params;

    const expenses = await findAllExpenses(options,query);
    res.status(200).json({
      status: 'success',
      result: expenses.length,
      data: {
        expenses,
      },
    });
  } catch (err: any) {
    next(err);
  }
};

export const createExpenseHandler = async (
    req: Request<{}, {}, CreateExpenseInput>,
    res: Response,
    next: NextFunction
  ) => {
    try {
        const user = res.locals.user;

        const expense = await createExpense({
        name: req.body.name,
        date: req.body.date,
        amount: req.body.amount,
        category : req.body.category,
        description : req.body.description,
        user:req.body.user
      });
  
      res.status(201).json({
        status: 'success',
        data: {
          expense,
        },
      });
    } catch (err: any) {
      
      next(err);
    }
  };

  export const updateExpenseHandler = async (
    req: Request<{id:string}, {}, UpdateExpenseInput>,
    res: Response,
    next: NextFunction
  ) => {
    try {
        const id =req.params.id;
        const expense = await updateExpense(id,{
        name: req.body.name,
        date: req.body.date,
        amount: req.body.amount,
        category : req.body.category,
        description : req.body.description,
        user:req.body.user
      });
  
      res.status(201).json({
        status: 'success',
        data: {
          expense,
        },
      });
    } catch (err: any) {
      
      next(err);
    }
  };

  export const getExpensesByIdHandler = async(
    req: Request,
  res: Response,
  next: NextFunction
  )=>{
    try {
      
      const expense = await findExpenseById(req.params.id!);

    res.status(201).json({
      status: 'success',
      data: {
        expense,
      },
    });
  } catch (err: any) {
    
    next(err);
  }
  }

  
  export const deleteExpensesHandler = async(
    req: Request,
  res: Response,
  next: NextFunction
  )=>{
    try {
      
    const expense = await deleteExpense(req.params.id!);

    res.status(201).json({
      status: 'success',
      data: {
        expense,
      },
    });
  } catch (err: any) {
    
    next(err);
  }
  }


