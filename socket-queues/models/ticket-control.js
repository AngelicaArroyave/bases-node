import fs from 'fs'

export class Ticket {
    constructor(number, desktop) {
        this.number = number
        this.desktop = desktop
    }
}

export class TicketControl {
    constructor() {
        this.last = 0
        this.today = new Date().getDate()
        this.tickets = []
        this.lastFour = []

        this.path = './db/data.json'
        this.init()
    }

    get toJson() {
        return {
            last: this.last,
            today: this.today,
            tickets: this.tickets,
            lastFour: this.lastFour
        }
    }

    init() {
        const readData = fs.readFileSync(this.path, 'utf8')
        const { last, today, tickets, lastFour } = JSON.parse(readData)
        
        if(today === this.today) {
            this.last = last
            this.tickets = tickets
            this.lastFour = lastFour
        } else {
            this.saveDB()
        }
    }

    saveDB() {
        fs.writeFileSync(this.path, JSON.stringify(this.toJson), 'utf8')
    }

    nextTicket() {
        this.last += 1
        const ticket = new Ticket(this.last, null)
        
        this.tickets.push(ticket)
        this.saveDB()

        return `Ticket ${ticket.number}`
    }

    attendTicket(desktop) {
        if(this.tickets.length === 0) return null

        const ticket = this.tickets.shift() // this.tickets[0]
        ticket.desktop = desktop

        this.lastFour.unshift(ticket)

        if(this.lastFour.length > 4) this.lastFour.splice(-1, 1)

        this.saveDB()

        return ticket.number
    }
}