import {
    getModelForClass,
    index,
    prop,
  } from '@typegoose/typegoose';
  @index({ name: 1 })
  
  // Export the Category class to be used as TypeScript type
   export class Category {
    @prop({ unique: true, required: true})
    name: string;  
  }
  
  // Create the category model from the Category class
  const categoryModel = getModelForClass(Category);
  export default categoryModel;

  
  
  