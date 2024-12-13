import { TicketControl } from '../models/ticket-control.js'

const ticketControl = new TicketControl()

export const socketController =  client => {
    client.on('next-ticket', (message, callback) => {
        const next = ticketControl.nextTicket()
        callback(next)
        client.broadcast.emit('pending-tickets', ticketControl.tickets.length)
    })

    client.emit('last-ticket', ticketControl.last)
    client.emit('current-status', ticketControl.lastFour)
    client.emit('pending-tickets', ticketControl.tickets.length)

    client.on('attend-ticket', ({ desktop }, callback) => {
        if(!desktop) return callback({ ok: false, message: 'El escritorio es obligatorio' })
            
        const ticket = ticketControl.attendTicket(desktop)
        client.broadcast.emit('current-status', ticketControl.lastFour)
        client.emit('pending-tickets', ticketControl.tickets.length)
        client.broadcast.emit('pending-tickets', ticketControl.tickets.length)

        if(!ticket) return callback({ ok: false, ticket, message: 'No hay tickets pendientes' })

        return callback({ ok: true, ticket })
    })
}