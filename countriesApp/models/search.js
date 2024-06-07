import axios from 'axios'

export class Search {
    BASE_URL_COUNTRIES = 'https://api.sampleapis.com/countries/countries/'
    BASE_URL_WEATHER = 'https://api.openweathermap.org/data/2.5/weather'
    history = ['Belgium', 'Bulgaria', 'Colombia']

    constructor() {
        // FIXME: Leer DB si existe
    }

    async  city(place = '') {
        try {
            // Para hacer una consulta de la ciudad: https://api.sampleapis.com/countries/countries/?name=Spain
            const instance = axios.create({
                baseURL: this.BASE_URL_COUNTRIES,
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

    async localWeather(term = '') {
        try {
            const instance = axios.create({
                baseURL: this.BASE_URL_WEATHER,
                params: {
                    'q': term,
                    'appid': process.env.OPENWEATHER_KEY,
                    'units': 'metric',
                    'lang': 'en'
                }
            })
            const response = await instance.get()
            const { weather, main } = response.data

            return {
                desc: weather[0].description,
                min: main.temp_min,
                max: main.temp_max,
                temp: main.temp
            }
        } catch (error) {
            console.log(error);
        }
    }
}