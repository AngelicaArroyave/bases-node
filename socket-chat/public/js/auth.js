const myForm = document.querySelector('form')
myForm.addEventListener('submit', event => {
    event.preventDefault() // Evita que se recargue la página
    const formData = {}

    for (let element of myForm.elements) {
        if(element.name.length > 0) formData[element.name] = element.value
    }

    fetch('http://localhost:8080/api/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(({ msg, token }) => {
        if(msg) return console.error(msg)
        
        localStorage.setItem('token', token)
        window.location = 'chat.html'
    })
    .catch(error => {
        console.log(error)
    })  
})

function handleCredentialResponse(response) {
    // Google Token: ID_TOKEN
    const body = { id_token: response.credential }

    fetch('http://localhost:8080/api/auth/google', {
        method: 'POST',
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify(body)
    })
    .then(response => response.json())
    .then(({ token }) => {
        localStorage.setItem('token', token)
        window.location = 'chat.html'
    })
    .catch(console.warn())
}

const button = document.getElementById('google_signout')
button.onclick = () => {
    google.accounts.id.disableAutoSelect()
    google.accounts.id.revoke(localStorage.getItem('email'), done => {
        localStorage.clear()
        location.reload()
    })
}