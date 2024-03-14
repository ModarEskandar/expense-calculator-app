import express from 'express';

import { deserializeUser } from '../middleware/deserializeUser';
import { createCategoryHandler, getAllCategorysHandler } from '../controllers/category.controller';

const router = express.Router();
router.use(deserializeUser);

// Get Categories route
router.get('/', getAllCategorysHandler);

// Create Category route
router.post('/', createCategoryHandler);





export default router;