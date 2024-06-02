import { inquirerMenu, pause, readInput } from "./helpers/inquirer.js";
import { Search } from "./models/search.js";

const main = async() => {
    let opt

    do {
        const search = new Search()
        opt = await inquirerMenu()

        switch (opt) {
            case 1:
                const place = await readInput('Ciudad a buscar: ')
                console.log("🚀 ~ main ~ place:", place)
                console.log('\nInformación de la ciudad\n'.green);
                console.log('Abreviación: ');
                console.log('Capital: ');
                console.log('Moneda: ');
                console.log('Nombre: ');
                console.log('Indicativo: ');
                console.log('Población: ');
                console.log('URL imagen de Bandera: ');
                console.log('URL imagen de Emblema: ');
                console.log('URL imagen de Ubicación: ');
                break;
            case 2:
                console.log('Historial');
                break;
        }

        await pause()
    } while (opt !== 0);
}

main()