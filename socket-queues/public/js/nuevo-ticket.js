// Referencias del HTML
const lblNuevoTicket = document.querySelector('#lblNuevoTicket')
const btnCreate = document.querySelector('button')

const socket = io()

socket.on('connect', () => {
    btnCreate.disabled = false
})

// Permite saber cuándo estamos desconectados
socket.on('disconnect', () => {
    btnCreate.disabled = true
})

btnCreate.addEventListener('click', () => {
    socket.emit('next-ticket', null, ticket => {
        lblNuevoTicket.innerText = ticket      
    })
})

socket.on('last-ticket', last => {
    lblNuevoTicket.innerText = `Ticket ${ last }`
})