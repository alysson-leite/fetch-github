import { getUser } from '/src/scripts/services/user.js'
import { getRepositories } from '/src/scripts/services/repos.js'
import { getEvents } from '/src/scripts/services/events.js'

import { user } from '/src/scripts/objects/user.js'

import { screen } from '/src/scripts/objects/screen.js'

document.getElementById('btn-search').addEventListener('click', () => {
    const userName = document.getElementById('input-search').value

    if(validaEmptyInput(userName)) return

    getUserData(userName)
})

document.getElementById('input-search').addEventListener('keyup', (e) => {
    const userName = e.target.value;
    const key = e.which || e.keyCode;
    const isEnterPressed = key === 13; //no JS a tecla enter é o 13

    if (isEnterPressed) {
        if(validaEmptyInput(userName)) return

        getUserData(userName)
    }
})

function validaEmptyInput(userName){
    if(userName.length === 0){
        alert('Preencha o nome do usuário do Github')
        return true
    }
}

async function getUserData(userName){

    const userResponse = await getUser(userName)
    console.log(userResponse) // quando o usuário não existe, vai imprimir 'message: not found'
    if(userResponse.message === 'Not Found'){
        screen.renderNotFound()
        return
    }

    const repositoriesResponse = await getRepositories(userName)

    const eventsResponse = await getEvents(userName)

    user.setInfo(userResponse)
    user.setRepositories(repositoriesResponse)
    user.setEvents(eventsResponse)

    console.log(eventsResponse)

    screen.renderUser(user)

}


