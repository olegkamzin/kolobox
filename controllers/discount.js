import ApiError from '../service/error/ApiError.js'
import { koloboxDiscount } from '../service/koloboxDiscount.js'
import koloboxAuth from '../service/koloboxAuth.js'

class DiscountController {
	async get (req, res, next) {
		try {
			return koloboxDiscount()
				.then(res => {
					return res.json(result)
				})
				.catch(err => {
					if (err.response.status === 401) {
						return koloboxAuth().then(() => {
							return koloboxDiscount()
								.then(async result => res.send(result.data))
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