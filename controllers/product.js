import ApiError from '../service/error/ApiError.js'
import axios from 'axios'
import { getTyres } from '../service/koloboxTyres.js'
import auth from '../service/koloboxAuth.js'

class ProductController {
	async get (req, res, next) {
		try {
			const { id } = req.query
			const product = await axios.get('https://api.shinpi.ru/product/' + id)
			return await getTyres(product.data.brand.name, product.data.article)
				.then(result => res.send(result.data[0]))
				.catch(async error => {
					if (error.response.status === 401) {
						return await auth().then(async () => {
							return await getTyres(product.data.brand.name, product.data.article)
								.then(result => res.send(result.data[0]))
								.catch(error => next(ApiError.badRequest(error)))
						})
					}
					return next(ApiError.badRequest(error))
				})
		} catch (e) {
			return next(ApiError.badRequest(e))
		}
	}
}

export default new ProductController()
