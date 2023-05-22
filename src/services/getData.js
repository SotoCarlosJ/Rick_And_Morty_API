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

const previousPage = (container, callback) => {
    container.innerHTML = '';
    callback(localStorage.previousPage);
    window.scroll(0, 0);
}

const nextPage = (container, callback) => {
    container.innerHTML = '';
    callback(localStorage.nextPage);
    window.scroll(0, 0);
}

export {
    getCharacters,
    getCharacter,
    previousPage,
    nextPage
}
