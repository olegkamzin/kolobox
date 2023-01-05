import ApiError from '../service/error/ApiError.js'
import { getDiscount } from '../service/koloboxDiscount.js'
import koloboxAuth from '../service/koloboxAuth.js'

class DiscountController {
	async get (req, res, next) {
		try {
			return getDiscount()
				.then(res => {
					return res.json(res.data)
				})
				.catch(err => {
					if (err.response.status === 401) {
						return koloboxAuth().then(() => {
							return getDiscount()
								.then(result => res.send(result.data))
								.catch(error => next(ApiError.badRequest(error)))
						})
					}
					return next(ApiError.badRequest(err))
				})
		} catch (e) {
			return next(ApiError.badRequest(e))
		}
	}
}

export default new DiscountController()