import express from 'express';

import { createExpenseHandler, deleteExpensesHandler, getAllExpensesHandler, getExpensesByIdHandler, updateExpenseHandler } from '../controllers/expense.controller';
import { deserializeUser } from '../middleware/deserializeUser';
import { createExpenseSchema, updateExpenseSchema } from '../schema/expense.schema';
import { validate } from '../middleware/validate';

const router = express.Router();
router.use(deserializeUser);

// Get Expenses route
router.get('/', getAllExpensesHandler);

// Create Expense route
router.post('/', validate(createExpenseSchema), createExpenseHandler);


router.put('/:id', validate(updateExpenseSchema), updateExpenseHandler);


// Get Expense by id info route
router.get('/:id', getExpensesByIdHandler);

// Get Expense by id info route
router.delete('/:id', deleteExpensesHandler);

export default router;