import dotenv from 'dotenv/config'
import { inquirerMenu, pause, readInput } from "./helpers/inquirer.js"
import { Search } from "./models/search.js"

const main = async() => {
    let option = ''

    do {
        option = await inquirerMenu()
        await selectMainChoice(option)
        await pause()
    } while(option != 0)
}

const selectMainChoice = async(option) => {
    const search = new Search()

    switch (option) {
        case 1:
            const term = await readInput('Ciudad a buscar: ')
            let information = await selectAChoice(term, search)
            search.addHistory(information)
            break
        case 2:
            search.history.forEach((place, index) => {
                const idx = `${index + 1}.`.green
                console.log(`${idx} ${place}`);
            })
            break
    }
}

const selectAChoice = async(term, search) => {
    const option = await inquirerMenu('information')
    const place = await search.city(term)
    const localWeather = await search.localWeather(term)

    switch (option) {
        case 1:
            printCityInformation(term, place[0])
            break
        case 2:
            console.log('Ciudad: '.blue.green, term.toUpperCase())
            printWeatherInformation(localWeather)
            break
        case 3:
            printCityInformation(term, place[0])
            console.log('---------------------------------------------><---------------------------------------------');
            printWeatherInformation(localWeather)
            break
    }

    return place[0].name
}

const printCityInformation = (term, place) => {
    console.log('Ciudad: '.green, term.toUpperCase())
    console.log('Abreviación: '.blue, `${place.abbreviation}`.green)
    console.log('Capital: '.blue, `${place.capital}`.green)
    console.log('Población: '.blue, `${place.population}`.green)
    console.log('Moneda: '.blue, `${place.currency}`.green)
    console.log('Indicativo: '.blue, `${place.phone}`.green)
    console.log('URL bandera: '.blue, `${place.media.flag}`.green)
    console.log('URL emblema: '.blue, `${place.media.emblem}`.green)
    if(place.media.orthographic.length !== 0) console.log('URL bandera: '.blue, `${place.media.orthographic}`.green)
}

const printWeatherInformation = (localWeather) => {
    console.log('La información meteorológica se muestra en grados'.green)
    console.log('Descripción: '.blue, `${localWeather.desc}`.green)
    console.log('Temperatura: '.blue, `${localWeather.temp}`.green)
    console.log('Temperatura máxima: '.blue, `${localWeather.max}`.green)
    console.log('Temperatura mínima: '.blue, `${localWeather.min}`.green)
}

main()