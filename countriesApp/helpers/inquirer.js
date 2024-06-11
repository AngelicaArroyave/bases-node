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

const informationMenuOpts = [
    {
        type: 'list',
        name: 'option',
        message: 'Seleccione información a ver',
        choices: [
            {
                value: 0,
                name: '0. '.green + 'Cancelar'
            },
            {
                value: 1,
                name: `${'1.'.green} Información básica`
            },
            {
                value: 2,
                name: `${'2.'.green} Información meteorológica`
            },
            {
                value: 3,
                name: `${'3.'.green} Toda la información`
            }
        ]
    }
]

export const inquirerMenu = async(typeOptions = 'general') => {
    console.clear()
    console.log('==============================='.green);
    console.log('     Seleccione una opción'.white);
    console.log('===============================\n'.green);

    const choiceOptions = typeOptions !== 'general' ? informationMenuOpts : menuOpts
    const { option } = await inquirer.prompt(choiceOptions)

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