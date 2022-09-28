// === TELA(screen) ===
// Fazer aparecer na tela

const screen = {
    userProfile: document.querySelector('.profile-data'),
    renderUser(user){
        this.userProfile.innerHTML = `<div class="info">
        <img src="${user.avatarUrl}" alt="Foto de  perfil do usuário"/>
                    <div class="data">
                        <h1>${user.name ?? 'Não possui nome cadastrado 😥'}</h1>
                        <p>${user.bio ?? 'Não possui bio cadastrada 😥'}</p>
                        <p>Seguidores: ${user.followers}</p>
                        <p>Seguindo: ${user.following}</p>
                    </div>
                    </div>`;

        let repositoriesItens = '';
        user.repositories.forEach(repo => repositoriesItens += `<li class="repo-list">
                                                                    <a href="${repo.html_url}" target="_blank">${repo.name}</a>
                                                                    <span class="repo">🍴 ${repo.forks_count}</span>
                                                                    <span class="repo">⭐ ${repo.stargazers_count}</span>
                                                                    <span class="repo">👀 ${repo.watchers_count}</span>
                                                                    <span class="repo">💻 ${repo.language}</span>
                                                                </li>`)

        if(user.repositories.length > 0){
            this.userProfile.innerHTML += `<div class="repositories section">
                                                <h2>Repositórios</h2>
                                                <ul>${repositoriesItens}</ul>
                                           </div>`
        }

        let eventsItens = '';
        user.events.forEach((event) => { if(event.type == 'CreateEvent'){
                                            eventsItens += `<li>
                                                                <span>${event.repo.name}</span>
                                                                <span>-${event.payload.description}</span>
                                                            </li>`}
                                         if(event.type == 'PushEvent'){
                                            eventsItens += `<li>
                                                                <span>${event.repo.name}</span>
                                                                <span>-${event.payload.commits[0].message}</span>
                                                            </li>`}
                                        })

        if(user.events.length > 0){
            this.userProfile.innerHTML += `<div class="events">
                                                <h2>Eventos</h2>
                                                <ul>${eventsItens}</ul>
                                           </div>`
        }
    },
    renderNotFound(){
        this.userProfile.innerHTML = '<h2>Usuário não encontrado</h2>'
    }
}

export { screen }