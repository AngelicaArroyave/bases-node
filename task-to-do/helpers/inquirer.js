const inquirer = require('inquirer')

require('colors')

const menuOpts = [
    {
        type: 'list',
        name: 'option',
        message: '¿Qué desea hacer?',
        choices: [
            {
                value: '1',
                name: `${'1.'.green} Crear tarea`
            },
            {
                value: '2',
                name: `${'2.'.green} Listar tareas`
            },
            {
                value: '3',
                name: `${'3.'.green} Listar tareas completadas`
            },
            {
                value: '4',
                name: `${'4.'.green} Listar tareas pendientes`
            },
            {
                value: '5',
                name: `${'5.'.green} Completar tarea/s`
            },
            {
                value: '6',
                name: `${'6.'.green} Borrar tarea`
            },
            {
                value: '0',
                name: `${'0.'.green} Salir`
            }
        ]
    }
]

const inquirerMenu = async() => {
    console.clear()
    console.log('==============================='.green);
    console.log('     Seleccione una opción'.white);
    console.log('===============================\n'.green);

    const { option } = await inquirer.prompt(menuOpts)

    return option
}

const pause = async() => {
    const question = [
        {
            type: 'input',
            name: 'enter',
            message: `Presione ${'ENTER'.green} para continuar`
        }
    ]

    console.log('\n');
    await inquirer.prompt(question)
}

const readInput = async(message) => {
    const question = [
        {
            type: 'input',
            name: 'desc',
            message,
            validate(value) {
                if(value.length === 0) return 'Por favor ingrese un valor'
                return true
            }
        }
    ]

    const { desc } = await inquirer.prompt(question)
    return desc
}

const listTasksToBeDeleted = async(tasks = []) => {
    const choices = tasks.map((task, index) => {
        const idx = `${index + 1}`.green

        return {
            value: task.id,
            name: `${idx} ${task.desc}`
        }
    })

    choices.unshift({
        value: '0',
        name: '0. '.green + 'Cancelar'
    })

    const deleteOpts = [
        {
            type: 'list',
            name: 'id',
            message: 'Borrar',
            choices
        }
    ]

    const { id } = await inquirer.prompt(deleteOpts)

    return id
}

const confirm = async(message) => {
    const question = [
        {
            type: 'confirm',
            name: 'ok',
            message
        }
    ]

    const { ok } = await inquirer.prompt(question)
    
    return ok
}

const showSelectedList = async(tasks = []) => {
    const choices = tasks.map((task, index) => {
        const idx = `${index + 1}`.green

        return {
            value: task.id,
            name: `${idx} ${task.desc}`,
            checked: (task.completed) ? true : false
        }
    })

    const options = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Selecciones',
            choices
        }
    ]

    const { ids } = await inquirer.prompt(options)

    return ids
}

module.exports = { inquirerMenu, pause, readInput, listTasksToBeDeleted, confirm, showSelectedList }