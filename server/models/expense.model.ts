import {
    Ref,
    getModelForClass,
    index,
    modelOptions,
    prop,
  } from '@typegoose/typegoose';
import { Category } from './category.model';
import { User } from './user.models';
  
  @index({ user: 1 })
  @modelOptions({
    schemaOptions: {
      // Add createdAt and updatedAt fields
      timestamps: true,
    },
  })
  
  // Export the Expense class to be used as TypeScript type
   export class Expense {
    @prop()
    name: string;
  
    @prop({ required: true })
    date : Date;

    @prop({ required: true })
    amount : number;
  
    @prop({ ref: () => Category, required: true })
    category: Ref<Category,string>;
    
    @prop({ ref: () => User, required: true })
    user: Ref<User,string>;

    @prop({  })
    description: string;
  
  }
  
  // Create the expense model from the Expense class
  const expenseModel = getModelForClass(Expense);
  export default expenseModel;

  
  
  