import Router from 'express'
import orders from './orders.js'
import products from './products.js'

const router = new Router()

router.use('/service/kolobox/orders', orders)
router.use('/service/kolobox/products', products)

export default router
