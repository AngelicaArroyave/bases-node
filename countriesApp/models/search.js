import axios from 'axios'

export class Search {
    history = ['Belgium', 'Bulgaria', 'Colombia']

    constructor() {
        // FIXME: Leer DB si existe
    }

    async  city(place = '') {
        try {
            // Para hacer una consulta de la ciudad: https://api.sampleapis.com/countries/countries/?name=Spain
            const instance = axios.create({
                baseURL: 'https://api.sampleapis.com/countries/countries/',
                params: {
                    'name': place
                }
            })
            const response = await instance.get()
    
            return response.data
        } catch (error) {
            return []
        }
    }
}