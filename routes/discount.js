import Router from 'express'
import DiscountController from '../controllers/discount.js'
const router = new Router()

router.get('/', DiscountController.get)

export default router
