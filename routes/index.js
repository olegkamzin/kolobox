import Router from 'express'
import orders from './orders.js'
import products from './products.js'
import discount from './discount.js'

const router = new Router()

router.use('/kolobox/orders', orders)
router.use('/kolobox/products', products)
router.use('/kolobox/discount', discount)

export default router
