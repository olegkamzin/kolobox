import { getOrder, postOrder, postReserve } from '../service/koloboxOrders.js'
import ApiError from '../service/error/ApiError.js'
import axios from 'axios'

class OrderController {
	async post (req, res, next) {
		try {
			const { id, quantity } = req.query
			const vendor = await axios.get(process.env.API + 'vendor/' + '?id=' + id)
			const products = [{ id: vendor.data.kolobox, quantity }]
			postReserve(products)
				.then(async result => {
					// const order = await getOrder(result.data.orders[0])
					res.send(result.data)
				})
				.catch(error => {
					if (error.response.status === 401) {
						return auth().then(() => {
							postReserve(products)
								.then(async result => {
									// const order = await getOrder(result.data.orders[0])
									res.send(result.data)
								})
								.catch(error => next(ApiError.badRequest(error)))
						})
					}
					next(ApiError.badRequest(error))
				})
		} catch (e) {
			next(ApiError.badRequest(e))
		}
	}

	async put (req, res, next) {
		try {
			const { id, quantity, reserve_id } = req.query
			const vendor = await axios.get(process.env.API + 'vendor/' + '?id=' + id)
			const products = [{ id: vendor.data.kolobox, quantity }]
			postOrder(reserve_id, products)
				.then(async result => {
					const order = await getOrder(result.data.orders[0])
					res.send({ order: result.data, ...order.data })
				})
				.catch(error => {
					if (error.response.status === 401) {
						return auth().then(() => {
							postOrder(reserve_id, products)
								.then(async result => {
									const order = await getOrder(result.data.orders[0])
									res.send({ order: result.data, ...order.data })
								})
								.catch(error => next(ApiError.badRequest(error)))
						})
					}
					next(ApiError.badRequest(error))
				})
		} catch (e) {
			next(ApiError.badRequest(e))
		}
	}

	async get (req, res, next) {
		try {
			const { id } = req.query
			console.log(id)
			getOrder(id)
				.then(result => res.send(result.data))
				.catch(error => {
					if (error.response.status === 401) {
						return auth().then(() => {
							getOrder(id)
								.then(result => res.send(result.data))
								.catch(error => next(ApiError.badRequest(error)))
						})
					}
					next(ApiError.badRequest(error))
				})
		} catch (e) {
			next(ApiError.badRequest(e))
		}
	}
}

export default new OrderController()
