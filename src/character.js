/**
 * Importando la funcion para traer los personajes
 */
import { getCharacter } from "./services/getData.js";

/**
 * Guardando los elementos del DOM
 */
const mainCharacter = document.querySelector('#main-character');
const characterContainer = document.querySelector('#character-container');
const loader = document.querySelector('#loader');
const loaderRing = document.querySelector('#loader__ring');
const character = document.querySelector('#character');
const pagination = document.querySelector('#pagination');

/**
 * Guardando el id del personaje seleccionado
 */
const params = window.location.search;
const id = new URLSearchParams(params);
const charID = id.get('id');

/**
 * Funcion asincrona para cargar datos del personaje seleccionado desde el index.html
 * Adicional esta funcion esta dentro de un setTimeout para poder ver el loader mas tiempo
 */
setTimeout(() => {
    const loadCharacter = async (id = 1) => {
        const data = await getCharacter(id);
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
            character.appendChild(article);
    }
    loadCharacter(charID);
    /**
     * Sacando el loader cuando carguen los personajes
     */
    loaderRing.classList.remove('loader__ring');
    loader.classList.remove('loader');
}, 1000);