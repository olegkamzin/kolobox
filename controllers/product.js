import ApiError from '../service/error/ApiError.js'
import axios from 'axios'
import { getTyres } from '../service/koloboxTyres.js'
import auth from '../service/koloboxAuth.js'
import LogError from '../service/error/LogError.js'

class ProductController {
	async get (req, res, next) {
		try {
			const { id } = req.query
			const product = await axios.get('https://api.shinpi.ru/product/?id=' + id)
			getTyres(product.data.brand.name, product.data.article)
				.then(result => res.send(result.data[0]))
				.catch(error => {
					if (error.response.status === 401) {
						return auth().then(() => {
							getTyres(product.data.brand.name, product.data.article)
								.then(result => res.send(result.data[0]))
								.catch(error => next(ApiError.badRequest(error)))
						})
					}
					next(ApiError.badRequest(error))
				})
		} catch (e) {
			LogError(e)
			next(ApiError.badRequest(e))
		}
	}
}

export default new ProductController()
