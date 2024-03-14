import { omit } from 'lodash';
import { FilterQuery, QueryOptions } from 'mongoose';
import { excludedFields } from '../controllers/auth.controller';

import categoryModel, { Category } from '../models/category.model';

// CreateCategory service
export const createCategory = async (input: Partial<Category>) => {
    const category = await categoryModel.create(input);
    return omit(category.toJSON());
  };
  
// Find Category by Id
export const findCategoryById = async (id: string) => {
  const category = await categoryModel.findById(id).lean();
  return omit(category, excludedFields);
};

// Find All categories
export const findAllCategories = async () => {
  return await categoryModel.find();
};

// Find one category by any fields
export const findCategory = async (
  query: FilterQuery<Category>,
  options: QueryOptions = {}
) => {
  return await categoryModel.findOne(query, {}, options);
};


