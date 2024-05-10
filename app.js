require('colors')

const { inquirerMenu, pause, readInput, listTaksToBeDeleted } = require('./helpers/inquirer');
const { saveDB, readDB } = require('./helpers/saveFile');
const Tasks = require('./models/tasks');

const main = async() => {
    let opt = ''
    const tasks = new Tasks()
    const tasksDB = readDB()

    if(tasksDB) tasks.loadTasksFromArray(tasksDB)

    do {
        opt = await inquirerMenu()
        switch (opt) {
            case '1':
                const desc = await readInput('Descripción: ')
                tasks.createTask(desc)
                break;
            case '2':
                tasks.listComplete()
                break;
            case '3':
                tasks.listPendingCompleted()
                break;
            case '4':
                tasks.listPendingCompleted(false)
                break;
            case '6':
                const id = listTaksToBeDeleted(tasks.listArr)
                console.log({ id });
                break;
        }

        saveDB(tasks.listArr)
        await pause()
    } while (opt !== '0');
}

main()