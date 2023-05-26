/**
 * Importando la funcion para traer los personajes
 */
import { getCharacter } from "./services/getData.js";
import { loadCharacter } from "./services/printData.js";

/**
 * Guardando los elementos del DOM
 */
const loader = document.querySelector('#loader');
const loaderRing = document.querySelector('#loader__ring');
const character = document.querySelector('#character');

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
    loadCharacter(charID, getCharacter, character);

    /**
     * Sacando el loader cuando carguen los personajes
     */
    loaderRing.classList.remove('loader__ring');
    loader.classList.remove('loader');
}, 1000);


