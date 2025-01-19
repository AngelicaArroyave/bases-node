let user = null
let socket = null

// Referencias HTML
const txtUid = document.querySelector('#txtUid')
const txtMessage = document.querySelector('#txtMessage')
const ulUsers = document.querySelector('#ulUsers')
const ulMessages = document.querySelector('#ulMessages')
const btnExit = document.querySelector('#btnExit')

// Validate the local storage token
const validateJWT = async() => {
    const token = localStorage.getItem('token') || ''

    if(token.length <= 10) {
        window.location = 'index.html'
        throw new Error('No token on the server')
    }

    const result = await fetch('http://localhost:8080/api/auth', {
        headers: {
            'x-token':token
        }
    })

    const { user: userDB, token: tokenDB } = await result.json()
    localStorage.setItem('token', tokenDB)
    user = userDB
    document.title = `${user.name}`

    await connectSocket()
}

const connectSocket = async() => {
    socket = io({
        'extraHeaders': {
            'x-token': localStorage.getItem('token')
        }
    })

    socket.on('connect', () => {
        console.log('Sockets online')
    })

    socket.on('disconnect', () => {
        console.log('Sockets offline')
    })

    socket.on('receive-messages', drawMessages)

    socket.on('users-online', payload => {
        drawUsers(payload)
    })

    socket.on('message-private', drawPrivateMessages)
}

const drawUsers = (users = []) => {
    let usersHTML = ''
    users.forEach(({ name, uid }) => {
        usersHTML += `<li>
            <p>
                <h5 class="text-success"> ${name} </h5>
                <span class="fs-6 text-muted"> ${uid} </span>
            </p>
        </li>`
    })
    ulUsers.innerHTML = usersHTML
}

const drawMessages = (messages = []) => {
    let messagesHTML = ''
    messages.forEach(({ name, message }) => {
        messagesHTML += `<li>
            <p>
                <span class="text-primary"> ${name} </span>
                <span> ${message} </span>
            </p>
        </li>`
    })
    ulMessages.innerHTML = messagesHTML
}

const drawPrivateMessages = (messages = []) => {
    console.log("🚀 ~ drawPrivateMessages ~ message:", messages)
    let messagesHTML = ''
    let arrayMessages = []
    arrayMessages.unshift(messages);

    arrayMessages.forEach(({ from, message }) => {
        messagesHTML += `<li>
            <p>
                <span class="text-primary"> ${from}: </span>
                <span> ${message} </span>
            </p>
        </li>`
    })
    ulMessages.innerHTML = messagesHTML
}

btnExit.addEventListener('click', () => {
    socket.disconnect()
    localStorage.removeItem('token')
    window.location = 'index.html'
})

// Con el keyCode 13 se captura la tecla Enter
txtMessage.addEventListener('keyup', ({ keyCode }) => {
    const message = txtMessage.value
    const uid = txtUid.value

    if(keyCode !== 13) return
    if(message.length === 0) return

    socket.emit('send-message', { uid, message })
    txtMessage.value = ''
})

const main = async() => {
    await validateJWT()
}

main()