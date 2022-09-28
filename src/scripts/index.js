import { getUser } from './services/user.js'
import { getRepositories } from './services/repos.js'
import { getEvents } from './services/events.js'

import { user } from './objects/user.js'

import { screen } from './objects/screen.js'

document.getElementById('btn-search').addEventListener('click', () => {
    const userName = document.getElementById('input-search').value

    if(validaEmptyInput(userName)) return

    getUserData(userName)
})

document.getElementById('input-search').addEventListener('keyup', (e) => {
    const userName = e.target.value;
    const key = e.which || e.keyCode;
    const isEnterPressed = key === 13;

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
    
    if(userResponse.message === 'Not Found'){
        screen.renderNotFound()
        return
    }

    const repositoriesResponse = await getRepositories(userName)

    const eventsResponse = await getEvents(userName)

    user.setInfo(userResponse)
    user.setRepositories(repositoriesResponse)
    user.setEvents(eventsResponse)


    screen.renderUser(user)

}


