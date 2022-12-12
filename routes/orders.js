import Router from 'express'
import OrderController from '../controllers/order.js'
const router = new Router()

router.post('/', OrderController.post)
router.get('/', OrderController.get)
// router.put('/', OrderController.put)

export default router
