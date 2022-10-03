import Router from 'express'
import ProductController from '../controllers/product.js'
import auth from '../middleware/auth.js'
const router = new Router()

router.get('/', auth, ProductController.get)

export default router