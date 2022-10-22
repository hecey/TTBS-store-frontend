import { buildHTMLItem } from "./html/item.js"
import { buildHTMLCategory } from "./html/category.js"
import { buildHTMLPagination } from "./html/pagination.js"
import { buildHTMLBreadcrumb } from "./html/breadcrumb.js"
import { spinner } from "./html/spinner.js"
import { clearElement, toCapital } from "../js/helper.js"
import { paginationListener } from "../js/listener.js"

/**
 * Llama la URL del recibida mediante loadData.
 * Muestra el menu mediante displayMenu.
 * Muestra todos los elementos restantes mediante updateHTML.
 * @param {object} config Contiene los elemento html a manipular y urls del backend
 */
const renderAll = async (config) => {
    document.getElementById("searchForm").onsubmit = (event) => event.preventDefault()
    spinner(config.sidebarUL, true)
    spinner(config.galleryEL, true)
    const responseJson = await loadJsonData(config.URL_CATEGORIES, config.URL_PROXY)
    let { name } = responseJson.data[0]
    let { id } = responseJson.data[0]
    spinner(config.sidebarUL, false)
    renderMenu(config.sidebarUL, responseJson)
    const filter = {
        categoryId: id,
        categoryName: name,
        page: '',
        query: ''
    };
    await updateHTML(config, filter)
}

/**
 * Muestra los datos el menu.
 * Construye los elementos mediante buildHTMLCategory
 * @param {elementoHTML} ul Elemento UL para carga de datos
 * @param {any} responseJson Datos en formato Json
 */
const renderMenu = (ul, responseJson) => {
    for (let { id, name } of responseJson.data) {
        const categoryHTML = buildHTMLCategory(id, name)
        ul.innerHTML += categoryHTML
    }
}

/**
 * Llama la URL del recibida mediante loadData.
 * Construye los elementos mediante buildHTMLItem
 * Muestra todos los elementos en la galería.
 * @param {object} config Contiene los elemento html a manipular y urls del backend
 * @param {object} filter Objeto con los filtros: categoryId Id de categoría, page Numero de página, query Nombre de producto o palabra clave
 */
const renderItems = async (config, filter) => {
    spinner(config.galleryEL, true)
    let queryFilter = `?page=${filter.page ? filter.page : 1}&`
    queryFilter += filter.query
        ? `name=${filter.query}`
        : `categoryId=${filter.categoryId}`

    const responseJson = await loadJsonData(config.URL_PRODUCTS.concat(queryFilter), config.URL_PROXY)
    spinner(config.galleryEL, false)
    for (let { id, name, url_image, price, discount } of responseJson.data) {
        config.galleryEL.innerHTML += buildHTMLItem(id, name, url_image, price, discount)
    }
}

/**
 * Llama la URL del recibida mediante loadData.
 * Construye los elementos mediante buildHTMLPagination
 * Muestra todos los elementos en la paginación.
 * @param {object} config Contiene los elemento html a manipular y urls del backend
 * @param {object} filter Objeto con los filtros: categoryId Id de categoría, page Numero de página, query Nombre de producto o palabra clave
 */
const renderPagination = async (config, filter) => {
    const queryFilter = filter.query ? `?name=${filter.query}` : `?categoryId=${filter.categoryId}`
    const responseJson = await loadJsonData(config.URL_PRODUCTS_GETNUMPAGES.concat(queryFilter), config.URL_PROXY)
    let { pages } = responseJson.data[0]
    for (let step = 0; step < pages; step++) {
        config.paginationEL.innerHTML += buildHTMLPagination(step + 1)
    }
    paginationListener(config)
}

/**
 * Construye la migaja de pan mediante buildHTMLBreadcrumb
 * Muestra la migaja de pan en paginationHTML.
 * @param {string} name Nombre de producto o palabra clave
 * @param {number} categoryId Id de categoría
 */
const renderBreadcrumb = (name, categoryId) => {
    breadcrumbEL.innerHTML = buildHTMLBreadcrumb(toCapital(name), categoryId)
}

/**
 * Llama la URL recibida que referencia al backend.
 * return, Retorna los datos (json) desde el backend.
 * @param {url} URL URL para carga de datos
 * @param {url} URL_PROXY URL proxy para pasar errores CORS localmente.
 * @returns {json} Retorna los datos (json) desde el backend.
 */
const loadJsonData = async (URL, URL_PROXY) => {

    let abortController = new AbortController();
    window.onbeforeunload = function (e) { abortController.abort(); };

    const fullURL = URL_PROXY + URL
    return await fetch(fullURL, { "signal": abortController.signal })
        .then(response => response.json())
        .then(responseJson => { return responseJson })
        .catch(err => {
            return console.log(err)
        })
}

const redirectErrorPage = () => {
    window.location.href = 'error404.html'
}

/**
 * Actualiza HTML mediante las funciones:
 * displayItems displayPagination, displayBreadcrumb, updateActiveCategory, updateActivePage.
 * @param {object} config Contiene los elemento html a manipular y urls del backend
 * @param {object} filter Objeto con los filtros: categoryId Id de categoría, page Numero de página, query Nombre de producto o palabra clave
 */
const updateHTML = async (config, filter) => {
    clearElement(config.paginationEL)
    renderBreadcrumb(filter.categoryName, filter.categoryId)
    updateActiveCategory(filter.categoryId)
    await renderItems(config, filter)
    await renderPagination(config, filter)
    updateActivePage(filter.page)
}

/**
 * Actualiza la categoría activa.
 * @param {string} categoryId Id de la categoría
 */
const updateActiveCategory = (categoryId) => {
    const lastActiveAnchor = sidebarUL.querySelector(`a[class='nav-link active']`)
    if (lastActiveAnchor)
        lastActiveAnchor.setAttribute('class', 'nav-link')
    const activeAnchor = sidebarUL.querySelector(`a[href='#${categoryId}']`)
    if (activeAnchor)
        activeAnchor.setAttribute('class', 'nav-link active')
}

/**
 * Actualiza el numero de página activa.
 * @param {any} page Numero de pagina
 */
const updateActivePage = (page) => {

    const lastActiveLI = paginationEL.querySelector(`li[class='page-item active']`)
    const activeAnchor = paginationEL.querySelector(`li a[href='#${page}']`)
    let activeLI;
    if (lastActiveLI)
        lastActiveLI.setAttribute('class', 'page-item')
    if (activeAnchor)
        activeLI = activeAnchor.parentElement
    if (activeLI)
        activeLI.setAttribute('class', 'page-item active')
}

export {
    renderAll,
    updateHTML
}