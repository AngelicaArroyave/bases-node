// Referencias HTML
const lblDesktop = document.querySelector('h1')
const btnAttend = document.querySelector('button')
const lblTicket = document.querySelector('small')
const divAlert = document.querySelector('.alert')
const lblPending = document.querySelector('#lblPendientes')

const searchParams = new URLSearchParams(window.location.search)

if(!searchParams.has('escritorio')) {
    window.location = 'index.html'
    throw new Error('El escritorio es obligatorio')
}

const desktop = searchParams.get('escritorio')
lblDesktop.innerText = desktop
divAlert.style.display = 'none'

const socket = io()

socket.on('connect', () => {
    btnAttend.disabled = false
})

// Permite saber cuándo estamos desconectados
socket.on('disconnect', () => {
    btnAttend.disabled = true
})

btnAttend.addEventListener('click', () => {
    // socket.emit('next-ticket', null, ticket => {
    //     lblNuevoTicket.innerText = ticket      
    // })
    socket.emit('attend-ticket', { desktop }, ({ ok, ticket, msg }) => {
        if(!ok) {
            lblTicket.innerText = 'Nadie'
            return divAlert.style.display = ''
        }

        lblTicket.innerText = `Ticket ${ ticket }`
    })
})

socket.on('pending-tickets', size => {
    if(size === 0) {
        lblPending.style.display = 'none'
    } else {
        lblPending.style.display = ''
        lblPending.innerText = size
    }
})