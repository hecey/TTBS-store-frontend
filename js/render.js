import { buildHTMLItem } from "./html/item.js"
import { buildHTMLCategory } from "./html/category.js"
import { buildHTMLPagination } from "./html/pagination.js"
import { buildHTMLBreadcrumb } from "./html/breadcrumb.js"
import { spinner } from "./html/spinner.js"
import { clearElement, toCapital } from "../js/helper.js"
import { paginationListener } from "../js/listener.js"

const renderAll = async (config) => {
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

const renderMenu = (ul, responseJson) => {
    for (let { id, name } of responseJson.data) {
        const categoryHTML = buildHTMLCategory(id, name)
        ul.innerHTML += categoryHTML
    }
}

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

const renderPagination = async (config, filter) => {
    const queryFilter = filter.name ? `?name=${filter.name}` : `?categoryId=${filter.categoryId}`
    const responseJson = await loadJsonData(config.URL_PRODUCTS_GETNUMPAGES.concat(queryFilter), config.URL_PROXY)
    let { pages } = responseJson.data[0]
    for (let step = 0; step < pages; step++) {
        config.paginationEL.innerHTML += buildHTMLPagination(step + 1)
    }
    paginationListener(config)
}

const renderBreadcrumb = (name, categoryId) => {
    breadcrumbEL.innerHTML = buildHTMLBreadcrumb(toCapital(name), categoryId)
}

const loadJsonData = async (URL, URL_PROXY) => {
    const fullURL = URL_PROXY + URL
    return fetch(fullURL, {
        method: 'GET',
    })
        .then(response => response.json())
        .then(responseJson => { return responseJson })
        .catch(err => redirectErrorPage(err))
}


const redirectErrorPage = () => {
    window.location.href = 'error404.html'
}

const updateHTML = async (config, filter) => {
    clearElement(config.paginationEL)
    renderBreadcrumb(filter.categoryName, filter.categoryId)
    updateActiveCategory(filter.categoryId)
    await renderItems(config, filter)
    await renderPagination(config, filter)
    updateActivePage(filter.page)
}

const updateActiveCategory = (categoryId) => {
    const lastActiveAnchor = sidebarUL.querySelector(`a[class='nav-link active']`)
    if (lastActiveAnchor)
        lastActiveAnchor.setAttribute('class', 'nav-link')
    const activeAnchor = sidebarUL.querySelector(`a[href='#${categoryId}']`)
    if (activeAnchor)
        activeAnchor.setAttribute('class', 'nav-link active')
}

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