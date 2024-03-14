import { coerce, date, number, object, string, TypeOf } from 'zod';

export const createExpenseSchema = object({
  body: object({
    name: string({ required_error: 'Name is required' }),
    date: coerce.date(
        { required_error: 'Date is required' }
    ),
    amount: number({ required_error: 'Amount is required' })
      ,
      category: string({ required_error: 'Category is required' }),
      description: string().optional(),
      user : string({ required_error: 'User is required' }),
  })
});
export const updateExpenseSchema = object({
  body: object({
    name: string({ required_error: 'Name is required' }),
    date: coerce.date(
        { required_error: 'Date is required' }
    ),
    amount: number({ required_error: 'Amount is required' })
      ,
      category: string({ required_error: 'Category is required' }),
      description: string().optional(),
      user : string({ required_error: 'User is required' }),
  })
});


export type CreateExpenseInput = TypeOf<typeof createExpenseSchema>['body'];
export type UpdateExpenseInput = TypeOf<typeof updateExpenseSchema>['body'];
