/**
 * Constante con la url de la API
 */
const URL = 'https://rickandmortyapi.com/api';

/**
 * Funcion asincrona para traer todos personajes de una pagina en especifica
 * @param page - numero de pagina a consultar
 * 
 */
const getCharacters = async (page) => {
    const res = await fetch(`${URL}/character/?page=${page}`);
    const data = await res.json();
    return data;
}

/**
 * Funcion asincrona para traer un solo personaje 
 * @param id - numero de idem a consultar
 * 
 * */
const getCharacter = async (id) => {
    const res = await fetch(`${URL}/character/${id}`);
    const data = await res.json();
    return data;
}

/**
 * Funcion para consultar la pagina anterior
 * @param container - la seccion que contiene la lista de personajes mostrados
 * @param callback - funcion para listar personajes
 * */
const previousPage = (container, callback) => {
    container.innerHTML = '';
    callback(localStorage.previousPage);
    window.scroll(0, 0);
}

/**
 * Funcion para consultar la pagina siguiente
 * @param container - la seccion que contiene la lista de personajes mostrados
 * @param callback - funcion para listar personajes
 * */
const nextPage = (container, callback) => {
    container.innerHTML = '';
    callback(localStorage.nextPage);
    window.scroll(0, 0);
}

/**
 * Funcion para consultar la primera pagina
 * @param container - la seccion que contiene la lista de personajes mostrados
 * @param callback - funcion para listar personajes
 * */
const firstPage = (container, callback) => {
    container.innerHTML = '';
    callback(1);
    window.scroll(0, 0);
}


/**
 * Funcion para consultar la ultima pagina
 * @param container - la seccion que contiene la lista de personajes mostrados
 * @param callback - funcion para listar personajes
 * */
const lastPage = (container, callback) => {
    container.innerHTML = '';
    callback(localStorage.lastPage);
    window.scroll(0, 0);
}

export {
    getCharacters,
    getCharacter,
    previousPage,
    nextPage,
    firstPage,
    lastPage
}
