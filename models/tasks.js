const Task = require("./task")

class Tasks {
    _list = {}

    constructor() {
        this._list = {}
    }

    createTask(desc = '') {
        const task = new Task(desc)
        this._list[task.id] = task
    }

    get listArr() {
        const list = []
        Object.keys(this._list).forEach(key => {
            list.push(this._list[key])
        })

        return list
    }

    loadTasksFromArray(tasks = []) {
        tasks.forEach(task => {
            this._list[task.id] = task
        })
    }

    listComplete() {
        console.log('\n');
        this.listArr.forEach((task, i) => {
            const index = `${i + 1}`.green
            const { desc, completed } = task
            const status = completed ? 'Completada'.green : 'Pendiente'.red
            console.log(`${index}. ${desc} :: ${status}`);
        })
    }

    listPendingCompleted(valueCompleted = true) {
        let cont = 0

        console.log('\n');
        this.listArr.forEach(task => {
            const { desc, completed } = task
            const status = completed ? 'Completada'.green : 'Pendiente'.red
            const typeFile = completed ? completed : status
            cont += 1
            
            if ((valueCompleted && completed) || (!valueCompleted && !completed)) console.log(`${cont.toString().green}. ${desc} :: ${typeFile}`);
        })
    }

    deleteTask(id = '') {
        if(this._list[id]) delete this._list[id]
    }
}

module.exports = Tasks