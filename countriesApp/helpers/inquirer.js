import inquirer from 'inquirer'
import colors from 'colors'

const menuOpts = [
    {
        type: 'list',
        name: 'option',
        message: '¿Qué desea hacer?',
        choices: [
            {
                value: 1,
                name: `${'1.'.green} Buscar ciudad`
            },
            {
                value: 2,
                name: `${'2.'.green} Historial`
            },
            {
                value: 0,
                name: `${'0.'.green} Salir`
            }
        ]
    }
]

export const inquirerMenu = async() => {
    console.clear()
    console.log('==============================='.green);
    console.log('     Seleccione una opción'.white);
    console.log('===============================\n'.green);

    const { option } = await inquirer.prompt(menuOpts)

    return option
}

export const pause = async() => {
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

export const readInput = async(message) => {
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

export const listSiteInformation = async(place = '') => {
    const choices = []
    const listChoices = Object.keys(place[0])
    listChoices.forEach((info, index) => {
        const number = `${index + 1}.`.green
        choices.push({
            value: number,
            name: `${number} ${info.charAt(0).toUpperCase() + info.slice(1)}`
        })
    })
    choices.unshift({
        value: '0',
        name: '0. '.green + 'Cancel'
    })
    choices.pop()
    choices.push({
        value: '8',
        name: '8. '.green + 'All'
    })
    const listOpts = [
        {
            type: 'list',
            name: 'id',
            message: 'Seleccione información a ver',
            choices
        }
    ]

    const { id } = await inquirer.prompt(listOpts)

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