/**
 * Funcion asincrona para imprimir personajes de pagina consultada
 */
const listCharacters = async (page = 1, pagePrinted, callback, section) => {
    const { info, results } = await callback(page);
    /**
     * Almacenando en el sessionStorage:
     * el numero de pagina consultado en la API
     * el numero de ultima pagina
     * el numero de pagina siguiente
     * el numero de paginaanterior
     */
    sessionStorage.setItem('currentPage', page);
    sessionStorage.setItem('lastPage', info.pages);
    info.next ? sessionStorage.setItem('nextPage', info.next.split('=')[1]) : sessionStorage.setItem('nextPage', info.pages);
    info.prev ? sessionStorage.setItem('previousPage', info.prev.split('=')[1]) : sessionStorage.setItem('previousPage', 1);
    
    /**
     * Creacion del card por cada personaje listado
     */
    results.forEach(character => {
        const article = document.createElement('article');
        article.setAttribute('class', 'card');
        article.innerHTML = `
            <picture>
                <img class="card__img" src="${character.image}" alt="Imagen de ${character.name}">
            </picture>
            <div class="card__info">
                <h4 class="card__tittle">${character.name}</h4>
                <p id="${character.id}-icon" class="card__text">
                ${
                /**
                 * Icono de vida (incluye status unknow) o muerte segun estatus del personaje
                 */
                character.status.toLowerCase() == 'alive' || character.status.toLowerCase() == 'unknown' 
                ? '<iconify-icon class="status__icon" icon="pajamas:status-health"></iconify-icon>' 
                : '<iconify-icon class="status__icon--death" icon="streamline:interface-edit-skull-1-crash-death-delete-die-error-garbage-remove-skull-trash"></iconify-icon>'}
                ${character.status}</p>
                <p class="card__text"><iconify-icon icon="ph:alien"></iconify-icon>${character.species}</p>
                <p class="card__text"><iconify-icon icon="ph:planet"></iconify-icon>${character.origin.name}</p>
                </div>
            </div>
            <a class="card__link" href="pages/character.html?id=${character.id}"><iconify-icon icon="ph:info"></iconify-icon>Ver detalles</a>
        `

        section.appendChild(article);
    });        

    /**
     * Mostrando pagina actual consultada
     */
    pagePrinted.innerHTML = `
        <p class="pagination__text">${sessionStorage.currentPage}</p>
        <p class="pagination__text">de ${sessionStorage.lastPage}</p>
        `
};

/**
 * Funcion asincrona para imprimir personaje seleccionado en ver detalles
 */
const loadCharacter = async (id = 1, callback, section) => {
    const data = await callback(id);
    const article = document.createElement('article');
    article.setAttribute('class', 'character');
    article.innerHTML = `
        <button id="goBack" class="btn btn--character">Back to homepage</button>
        <picture class="character__cover">
            <img class="character__img" src="${data.image}" alt="Imagen: ${data.name}">
        </picture>
        <div class="character__content">
            <h1 class="character__tittle">${data.name}</h1>
            <p class="character__episodes"><iconify-icon icon="ph:monitor-play-bold"></iconify-icon>Aparecio en: ${data.episode.length}</p>
            <div class="character__info">
                <p class="character__text">${
                    /**
                     * Icono de vida (incluye status unknow) o muerte segun estatus del personaje
                     */
                    data.status.toLowerCase() == 'alive' || data.status.toLowerCase() == 'unknown' 
                    ? '<iconify-icon class="status__icon" icon="pajamas:status-health"></iconify-icon>' 
                    : '<iconify-icon class="status__icon--death" icon="streamline:interface-edit-skull-1-crash-death-delete-die-error-garbage-remove-skull-trash"></iconify-icon>'}
                    ${data.status}</p>
                <p class="character__text"><iconify-icon icon="ph:alien"></iconify-icon>${data.species}</p>
                <p class="character__text"><iconify-icon icon="ph:gender-intersex"></iconify-icon>${data.gender}</p>
            </div>
        </div>
        <div class="location">
                <div class="location__content">
                    <iconify-icon class="location__icon" icon="ph:planet"></iconify-icon>
                    <p class="location__text location__text--color">${data.origin.name}</p>
                    <a class="btn btn--location" href="#"><iconify-icon icon="ph:info"></iconify-icon>Ver mas</a>
                    <button class="location__like"><iconify-icon class="like-icon" icon="iconamoon:heart"></iconify-icon></button>
                </div>
                <div class="location__content">
                    <iconify-icon class="location__icon" icon="ep:location"></iconify-icon>
                    <p class="location__text">${data.location.name}</p>
                    <a class="btn btn--location" href="#"><iconify-icon icon="ph:info"></iconify-icon>Ver mas</a>
                    <button class="location__like"><iconify-icon class="like-icon" icon="iconamoon:heart"></iconify-icon></button>
                </div>
            </div>
        `
    section.appendChild(article);

    /**
     * Agregando la funcionabilidad del boton "Back to homepage"
     */
    const goBack = document.querySelector('#goBack');
        goBack.addEventListener('click', () => {
            window.location.replace(`../index.html`);
    });
}

/**
 * Funcion asincrona para imprimir personajes filtrados por nombre
 */
const listCharactersFiltered = async (page, charName, filter, pagePrinted, callback, section) => {
    const { info, results } = await callback(filter)
    /**
     * Almacenando en el sessionStorage:
     * el numero de pagina consultado en la API
     * el numero de ultima pagina
     * el numero de pagina siguiente
     * el numero de paginaanterior
     */
    sessionStorage.setItem('currentPage', page);
    sessionStorage.setItem('lastPage', `page=${info.pages}&name=${charName}`);
    info.next ? sessionStorage.setItem('nextPage', info.next.split('?')[1]) : sessionStorage.setItem('nextPage', `page=${info.pages}&name=${charName}`);
    info.prev ? sessionStorage.setItem('previousPage', info.prev.split('?')[1]) : sessionStorage.setItem('previousPage', `page=1&name=${charName}`);
    
    characters.innerHTML = '';

    /**
     * Creacion del card por cada personaje listado
     */
    results.forEach(character => {
        const article = document.createElement('article');
        article.setAttribute('class', 'card');
        article.innerHTML = `
            <picture>
                <img class="card__img" src="${character.image}" alt="Imagen de ${character.name}">
            </picture>
            <div class="card__info">
                <h4 class="card__tittle">${character.name}</h4>
                <p id="${character.id}-icon" class="card__text">
                ${
                /**
                 * Icono de vida (incluye status unknow) o muerte segun estatus del personaje
                 */
                character.status.toLowerCase() == 'alive' || character.status.toLowerCase() == 'unknown' 
                ? '<iconify-icon class="status__icon" icon="pajamas:status-health"></iconify-icon>' 
                : '<iconify-icon class="status__icon--death" icon="streamline:interface-edit-skull-1-crash-death-delete-die-error-garbage-remove-skull-trash"></iconify-icon>'}
                ${character.status}</p>
                <p class="card__text"><iconify-icon icon="ph:alien"></iconify-icon>${character.species}</p>
                <p class="card__text"><iconify-icon icon="ph:planet"></iconify-icon>${character.origin.name}</p>
                </div>
            </div>
            <a class="card__link" href="pages/character.html?id=${character.id}"><iconify-icon icon="ph:info"></iconify-icon>Ver detalles</a>
        `

        section.appendChild(article);
    });

    /**
     * Mostrando pagina actual en la paginacion
     */
    pagePrinted.innerHTML = `
        <p class="pagination__text">${page}</p>
        <p class="pagination__text">de ${info.pages}</p>
        `
}

export {
    listCharacters,
    loadCharacter,
    listCharactersFiltered
}