/**
 * Importando la funcion para traer los personajes
 */
import { getCharacters } from "./services/getData.js";

/**
 * Guardando los elementos del DOM
 */
const main = document.querySelector('#main');
const mainContainer = document.querySelector('#main-container');
const loader = document.querySelector('#loader');
const loaderRing = document.querySelector('#loader__ring');
const search = document.querySelector('#search');
const characters = document.querySelector('#characters');

/**
 * Funcion asincrona para listar personajes por pagina
 * Adicional esta funcion esta dentro de un setTimeout para poder ver el loader mas tiempo
 */
setTimeout(() => {
    const listCharacters = async (page = 1) => {
        const { info, results } = await getCharacters(page);
        
        /**
         * Creacion de card por cada personaje listado
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

            characters.appendChild(article);
        });

        /**
         * Almacenando en el localStorage el numero de pagina consultado en la API
         */
        localStorage.setItem('backPage', page);
    };
    
    !localStorage.backPage 
    ? listCharacters()
    : listCharacters(localStorage.backPage);
    /**
     * Sacando el loader cuando carguen los personajes
     */
    loaderRing.classList.remove('loader__ring');
    loader.classList.remove('loader');
}, 1000);
