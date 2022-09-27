import Router from 'express'
import ProductController from '../controllers/product.js'
const router = new Router()

router.get('/', ProductController.get)

export default router