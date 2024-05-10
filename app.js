require('colors')

const { inquirerMenu, pause, readInput, listTasksToBeDeleted, confirm, showSelectedList } = require('./helpers/inquirer');
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
            case '5':
                const ids = await showSelectedList(tasks.listArr)
                tasks.toggleCompleted(ids)
                break;
            case '6':
                const id = await listTasksToBeDeleted(tasks.listArr)
                
                if(id !== '0') {
                    const response = await confirm('¿Está seguro?')
                    if(response) {
                        tasks.deleteTask(id)
                        console.log('Tarea borrada');
                    }
                }
                break;
        }

        saveDB(tasks.listArr)
        await pause()
    } while (opt !== '0');
}

main()