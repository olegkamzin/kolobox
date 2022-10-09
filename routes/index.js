import Router from 'express'
import orders from './orders.js'
import products from './products.js'

const router = new Router()

router.use('/kolobox/orders', orders)
router.use('/kolobox/products', products)

export default router
