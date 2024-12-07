// Referencias del HTML
const lblOnline = document.querySelector('#lblOnline')
const lblOffline = document.querySelector('#lblOffline')
const txtMessage = document.querySelector('#txtMessage')
const btnSend = document.querySelector('#btnSend')

const socket = io()

// Son como listeners
// Permite saber cuándo estamos conectados
socket.on('connect', () => {
    lblOffline.style.display = 'none'
    lblOnline.style.display = ''
})

// Permite saber cuándo estamos desconectados
socket.on('disconnect', () => {
    lblOnline.style.display = 'none'
    lblOffline.style.display = ''
})

socket.on('message', message => {
    console.log('Received message in client', message)
})

// btnSend.addEventListener('click', () => {
//     const message = txtMessage.value
//     socket.emit('message', message)
//     txtMessage.value = ''
// })

// También se puede mandar objetos
btnSend.addEventListener('click', () => {
    const message = txtMessage.value
    const payload = {
        message,
        id: '123ABC',
        date: new Date().getTime()
    }
    socket.emit('message', payload, id => {
        console.log('From server', id)        
    })
    txtMessage.value = ''
})