import axios from 'axios'

const getTyres = async (brand, articul) => {
	return await axios.get(process.env.KOLOBOX_URL + 'catalog/tyres/0/?articul=' + articul + '&mark=' + brand, {
		headers: { Authorization: 'Bearer ' + globalThis.token }
	})
}

export { getTyres }