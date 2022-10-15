import { clearElement, spinner, toCapital, getTextAfterHash } from "../js/helper.js";
import { buildHTMLItem } from "./html/item.js";
import { buildHTMLCategory } from "./html/category.js";
import { buildHTMLPagination } from "./html/pagination.js";
import { buildHTMLBreadcrumb } from "./html/breadcrumb.js";

async function loadData(URL, URL_PROXY) {
    const fullURL = URL_PROXY + URL
    return fetch(fullURL, {
        method: 'GET',
    })
        .then(response => response.json())
        .then(responseJson => { return responseJson })
        .catch(err => displayError(err))
}

function displayError(){
    window.location.href = 'error404.html';
}

async function displayAll(config) {
    spinner(config.sidebarUL, true)
    const responseJson = await loadData(config.URL_CATEGORIES, config.URL_PROXY)
    let { name } = responseJson.data[0]
    let { id } = responseJson.data[0]
    spinner(config.sidebarUL, false)
    await displayMenu(config.sidebarUL, responseJson)
    const filter = {
        categoryId: id,
        categoryName: name,
        page: '',
        query: ''
    };
    await updateHTML(config, filter)
}

async function displayMenu(ul, responseJson) {
    for (let { id, name } of responseJson.data) {
        const categoryHTML = buildHTMLCategory(id, name)
        ul.innerHTML += categoryHTML
    }
}

async function displayItems(config, filter) {
    spinner(config.galleryEL, true)
    let queryFilter = `?page=${filter.page ? filter.page : 1}&`
    queryFilter += filter.query
        ? `name=${filter.query}`
        : `categoryId=${filter.categoryId}`

    const responseJson = await loadData(config.URL_PRODUCTS.concat(queryFilter), config.URL_PROXY)
    spinner(config.galleryEL, false)
    for (let { id, name, url_image, price, discount } of responseJson.data) {
        config.galleryEL.innerHTML += buildHTMLItem(id, name, url_image, price, discount)
    }
}

async function displayPagination(config, filter) {
    const queryFilter = filter.name ? `?name=${filter.name}` : `?categoryId=${filter.categoryId}`
    const responseJson = await loadData(config.URL_PRODUCTS_GETNUMPAGES.concat(queryFilter), config.URL_PROXY)
    let { pages } = responseJson.data[0]
    for (let step = 0; step < pages; step++) {
        config.paginationEL.innerHTML +=buildHTMLPagination(step + 1)
    }
    paginationListener(config)
}

function displayBreadcrumb(name, categoryId) {
    breadcrumbEL.innerHTML = buildHTMLBreadcrumb(toCapital(name), categoryId)
}

async function menuListener(config) {
    document.querySelectorAll('.nav-item a').forEach((item) => {
        item.addEventListener('click', async (event) => {
            const link = event.target.href;
            const categoryId = getTextAfterHash(link)
            const categoryName = item.innerHTML
            const filter = {
                categoryId: categoryId,
                categoryName: categoryName,
                page: '',
                query: ''
            };
            await updateHTML(config, filter)
            event.preventDefault()
        });
    });
}

function searchListener(config) {
    const input = document.querySelector("input[type='search']")

    input.addEventListener('search', async () => {
        const query = input.value
        const filter = {
            categoryId: '',
            categoryName: query,
            page: '',
            query: query
        };
        await updateHTML(config, filter)
    });
}

async function paginationListener(config) {
    document.querySelectorAll('#paginationEL li a').forEach((item) => {
        item.addEventListener('click', async (event) => {
            const pageLink = event.target.href;
            const page = getTextAfterHash(pageLink)
            const categoryLink = breadcrumbEL.getElementsByTagName("a")[0].href;
            const categoryId = getTextAfterHash(categoryLink)
            const categoryName = breadcrumbEL.getElementsByTagName("a")[0].innerHTML;
            const query = !categoryId ? categoryName : ''

            const filter = {
                categoryId: categoryId,
                categoryName: categoryName,
                page: page,
                query: query
            };

            await updateHTML(config, filter)
            event.preventDefault()
        });
    });
}

async function updateHTML(config, filter) {
    clearElement(config.paginationEL)
    displayBreadcrumb(filter.categoryName, filter.categoryId)
    updateActiveCategory(filter.categoryId)
    await displayItems(config, filter)
    await displayPagination(config, filter)
    updateActivePage(filter.page)
}

function updateActiveCategory(categoryId) {
    const lastActiveAnchor = sidebarUL.querySelector(`a[class='nav-link active']`)
    if (lastActiveAnchor)
        lastActiveAnchor.setAttribute('class', 'nav-link')
    const activeAnchor = sidebarUL.querySelector(`a[href='#${categoryId}']`)
    if (activeAnchor)
        activeAnchor.setAttribute('class', 'nav-link active')
}

function updateActivePage(page) {

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

async function run() {
    const config = await import("../js/config.js");
    spinner(config.galleryEL, true)
    await displayAll(config)
    menuListener(config)
    searchListener(config)
}
run();