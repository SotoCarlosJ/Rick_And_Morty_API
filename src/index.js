/**
 * Importando la funcion para traer los personajes e imprimirlos
 */
import { getCharacters, getCharacterFiltered } from "./services/getData.js";
import { listCharacters, listCharactersFiltered } from "./services/printData.js";

/**
 * Guardando los elementos del DOM
 */
 // Loader
const loader = document.querySelector('#loader');
const loaderRing = document.querySelector('#loader__ring');
 // Search input
const search = document.querySelector('#search');
const searchIcon = document.querySelector('#search-icon');
const filter = document.querySelector('#filter');
const filterName = document.querySelector('#filter-name');
const filterClose = document.querySelector('#filter-close');
 // All Characters
const characters = document.querySelector('#characters');
const pagination = document.querySelector('#pagination');
const first = document.querySelector('#first');
const previous = document.querySelector('#previous');
const display = document.querySelector('#display');
const next = document.querySelector('#next');
const last = document.querySelector('#last');
 // Characters Filtered
const paginationFilter = document.querySelector('#pagination-filter');
const firstFilter = document.querySelector('#first-filter');
const previousFilter = document.querySelector('#previous-filter');
const displayFilter = document.querySelector('#display-filter');
const nextFilter = document.querySelector('#next-filter');
const lastFilter = document.querySelector('#last-filter');

/**
 * Funcion asincrona para listar personajes por pagina
 * Adicional esta funcion esta dentro de un setTimeout para poder ver el loader mas tiempo
 */
setTimeout(() => {
    listCharacters(sessionStorage.currentPage, display, getCharacters, characters);
    /**
     * Sacando el loader cuando carguen los personajes
     */
    loaderRing.classList.remove('loader__ring');
    loader.classList.remove('loader');

    /**
     * Listando personajes de la pagina anterior
     */
    previous.addEventListener('click', () => {
        characters.innerHTML = '';
        listCharacters(sessionStorage.previousPage, display, getCharacters, characters);
        window.scroll(0, 0);
    });

    /**
     * Listando personajes de la pagina siguiente
     */
    next.addEventListener('click', () => {
        characters.innerHTML = '';
        listCharacters(sessionStorage.nextPage, display, getCharacters, characters);
        window.scroll(0, 0);
    });

    /**
     * Listando personajes de la primera pagina
     */
    first.addEventListener('click', () => {
        characters.innerHTML = '';
        listCharacters(1, display, getCharacters, characters);
        window.scroll(0, 0);
    });

    /**
     * Listando personajes de la ultima pagina
     */
    last.addEventListener('click', () => {
        characters.innerHTML = '';
        listCharacters(sessionStorage.lastPage, display, getCharacters, characters);
        window.scroll(0, 0);
    });

}, 1000);

/**
 * Funcion asincrona para listar personajes filtrados por nombre
 */
searchIcon.addEventListener('click', () => {
    /**
     * Verificando si se ingreso un nombre para filtrar
     */
    if (!search.value ) alert('Debe ingresar un nombre');
    else {
        filter.style.display = 'flex'; /* Mostrando el nombre del filtro */
        const page = '1'; /* Numero de pagina consultada */
        const charName = search.value; /* Nombre del personaje filtrado */
        const characterSearch = `name=${search.value}`; /* Almacenando el valor para hacer la consulta */
        search.value = ''; /* Receteando el input */
        
        /**
         * Funcion para regresar al inicio donde se hizo la consulta a todos los personajes sin ningun filtro
         */
        filterName.innerHTML = charName;
        filterClose.addEventListener('click', () => {
            filter.style.display = 'none';
            sessionStorage.clear();
            location.reload();
        })

        listCharactersFiltered(page, charName, characterSearch, displayFilter, getCharacterFiltered, characters);

        /**
         * Mostrando la paginacion de personajes filtrados
         */
        paginationFilter.style.display = 'flex';
        pagination.style.display = 'none';

        /**
         * Listando personajes de la pagina anterior
         */
        previousFilter.addEventListener('click', () => {
            const page = sessionStorage.previousPage.split('&')[0].split('=')[1];
            characters.innerHTML = '';
            listCharactersFiltered(page, charName, sessionStorage.previousPage, displayFilter, getCharacterFiltered, characters);
            window.scroll(0, 0);
        });

        /**
         * Listando personajes de la pagina siguiente
         */
        nextFilter.addEventListener('click', () => {
            const page = sessionStorage.nextPage.split('&')[0].split('=')[1];
            characters.innerHTML = '';
            listCharactersFiltered(page, charName, sessionStorage.nextPage, displayFilter, getCharacterFiltered, characters);
            window.scroll(0, 0);
        });

        /**
         * Listando personajes de la primera pagina
         */
        firstFilter.addEventListener('click', () => {
            const page = 1;
            const name = sessionStorage.lastPage.split('&')[1];
            console.log(name);
            characters.innerHTML = '';
            listCharactersFiltered(page, charName, name, displayFilter, getCharacterFiltered, characters);
            window.scroll(0, 0);
        });

        /**
         * Listando personajes de la ultima pagina
         */
        lastFilter.addEventListener('click', () => {
            const page = sessionStorage.lastPage.split('&')[0].split('=')[1];
            characters.innerHTML = '';
            listCharactersFiltered(page, charName, sessionStorage.lastPage, displayFilter, getCharacterFiltered, characters);
            window.scroll(0, 0);
        });
    }
});