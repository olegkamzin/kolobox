import axios from 'axios'

const getOrder = async (id) => {
	return await axios.get(process.env.KOLOBOX_URL + 'orders/' + id, {
		headers: { Authorization: 'Bearer ' + globalThis.token }
	})
}

const postOrder = async (products) => {
	const params = new URLSearchParams()
	params.append('contractor_id', 'd69e8e66-130b-11ed-8ca4-08f1ead8f198')
	params.append('address_id', 6580)
	params.append('stock_type', 'local')
	params.append('sale_type', 3)
	params.append('order_type', 'order')
	params.append('delivery', 'shipment')
	params.append('comment', 'Позвонить за 30 минут до доставки.')
	params.append('stock_comment', 'Позвонить за 30 минут до доставки.')
	params.append('products', JSON.stringify(products))

	return await axios.post(process.env.KOLOBOX_URL + 'orders', params, {
		headers: { Authorization: 'Bearer ' + globalThis.token }
	})
}

// const postOrder = async (reserve_id, products) => {
// 	const params = new URLSearchParams()
// 	params.append('contractor_id', 'd69e8e66-130b-11ed-8ca4-08f1ead8f198')
// 	params.append('address_id', 6580)
// 	params.append('stock_type', 'local')
// 	params.append('sale_type', 3)
// 	params.append('order_type', 'order')
// 	params.append('delivery', 'shipment')
// 	params.append('comment', 'Позвонить за 30 минут до доставки.')
// 	params.append('stock_comment', 'Позвонить за 30 минут до доставки.')
// 	params.append('reserve_id', reserve_id)
// 	params.append('products', JSON.stringify(products))

// 	return await axios.post(process.env.KOLOBOX_URL + 'orders', params, {
// 		headers: { Authorization: 'Bearer ' + globalThis.token }
// 	})
// }

export { getOrder, postOrder }