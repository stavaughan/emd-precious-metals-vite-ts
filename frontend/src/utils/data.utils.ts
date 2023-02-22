import axios from 'axios';

import type { SelMetals } from '../features/metals/metals.types';

export type ReqData = {
	id: string;
	reqBody: object;
}

const httpRequests = {

    createField: async <T>(API_URL: string, reqData: ReqData): Promise<T> => {
        const response = await axios.post(API_URL, reqData)
        return response.data[0]
    },

    getPublicItem: async <T>(API_URL: string): Promise<T> => {
        const response = await axios.get(API_URL)
        return response.data[0]
    },

    deleteField: async <T>(API_URL: string, fieldKey: string ): Promise<T> => {
        const response = await axios.delete(API_URL + fieldKey)
        return response.data[0]
    },

    updateValue: async <T>(API_URL: string, reqData: ReqData): Promise<T> => {
        const { id, reqBody } = reqData;
        const response = await axios.patch(API_URL + id, reqBody)
        return response.data
    },

	getMetalsData: async <T>(API_URL: string, metals: SelMetals): Promise<T> => {
		const response = await axios.post(API_URL, metals)
		return response.data
	}
}

export default httpRequests;
