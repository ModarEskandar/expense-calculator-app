import { omit } from 'lodash';
import { FilterQuery, QueryOptions } from 'mongoose';

import expenseModel, { Expense } from '../models/expense.model';

// CreateExpense service
export const createExpense = async (input: Partial<Expense>) => {
  const expense = await expenseModel.create(input);
  return omit(expense.toJSON());
};

// Find Expense by Id
export const findExpenseById = async (id: string) => {
  const expense = await expenseModel.findById(id).lean();
  return omit(expense);
};

// Find All expenses
export const findAllExpenses = async (  options: QueryOptions = {},query: FilterQuery<Expense>
  ) => {
  return await expenseModel.find(query).limit(options.limit!);
};



// // Find All expenses
// export const findRecentExpenses = async (options: QueryOptions = {},query: FilterQuery<Expense>) => {  
//   return await expenseModel.find(query).limit(options.limit!);
// };

// Find one expense by any fields
export const findExpense = async (
  query: FilterQuery<Expense>,
  options: QueryOptions = {}
) => {
  return await expenseModel.findOne(query, {}, options);
};


