import { inquirerMenu, listSiteInformation, pause, readInput } from "./helpers/inquirer.js";
import { Search } from "./models/search.js";

const main = async() => {
    let opt

    do {
        const search = new Search()
        opt = await inquirerMenu()

        switch (opt) {
            case 1:
                const term = await readInput('Ciudad a buscar: ')
                const place = await search.city(term)
                const optionSelected = await listSiteInformation(place)
                break;
            case 2:
                console.log('Historial');
                break;
        }

        await pause()
    } while (opt !== 0);
}

main()