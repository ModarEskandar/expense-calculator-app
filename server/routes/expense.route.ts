import express from 'express';

import { createExpenseHandler, getAllExpensesHandler, getExpensesByIdHandler } from '../controllers/expense.controller';
import { deserializeUser } from '../middleware/deserializeUser';
import { createExpenseSchema } from '../schema/expense.schema';
import { validate } from '../middleware/validate';

const router = express.Router();
router.use(deserializeUser);

// Get Expenses route
router.get('/', getAllExpensesHandler);


// Create Expense route
router.post('/', validate(createExpenseSchema), createExpenseHandler);

// Get Expense by id info route
router.get('/:id', getExpensesByIdHandler);

export default router;