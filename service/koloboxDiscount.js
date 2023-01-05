import axios from 'axios'

const getDiscount = async () => {
	return await axios.get(process.env.KOLOBOX_URL + 'terms/discounts?operation=3', {
		headers: { Authorization: 'Bearer ' + globalThis.token }
	})
}

export { getDiscount }