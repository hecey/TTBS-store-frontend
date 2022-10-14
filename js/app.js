import { toCapital, getTextAfterHash } from "../js/helper.js";
import { buildHTMLItem } from "../js/item.js";
import { buildHTMLCategory } from "../js/category.js";
import { buildHTMLPagination } from "../js/pagination.js";
import { buildHTMLBreadcrumb } from "../js/breadcrumb.js";
import { URL_PROXY, URL_CATEGORIES, URL_PRODUCTS, URL_PRODUCTS_GETNUMPAGES } from "../js/config.js";

const sidebarUL = document.getElementById('sidebarUL')
const galleryEL = document.getElementById('galleryEL')
const paginationEL = document.getElementById('paginationEL')
const breadcrumbEL = document.getElementById('breadcrumbEL')

async function loadData(URL, URL_PROXY) {
    const fullURL = URL_PROXY + URL
    return fetch(fullURL, {
        method: 'GET',
    })
        .then(response => response.json())
        .then(responseJson => { return responseJson })
        .catch(err => console.warn('Something went wrong.', err))
}

async function displayAll(ul, URL_CATEGORIES, URL_PROXY) {
    const responseJson = await loadData(URL_CATEGORIES, URL_PROXY)
    let { name } = responseJson.data[0]
    let { id } = responseJson.data[0]
    displayMenu(ul, responseJson)
    await updateHTML(id, name)
}

async function displayMenu(ul, responseJson) {
    for (let { id, name } of responseJson.data) {
        const categoryHTML = buildHTMLCategory(id, name)
        ul.appendChild(categoryHTML)
    }
}

async function displayItems(gallery, URL_PRODUCTS, URL_PROXY, categoryId, page = 1, name) {
    gallery.innerHTML = ""
    let filter = `?page=${page ? page : 1}&`
    filter += name ? `name=${name}` : `categoryId=${categoryId}`

    const responseJson = await loadData(URL_PRODUCTS.concat(filter), URL_PROXY)

    for (let { id, name, url_image, price, discount } of responseJson.data) {
        const itemHTML = buildHTMLItem(id, name, url_image, price, discount)
        gallery.appendChild(itemHTML)
    }
}

async function displayPagination(pagination, URL_PRODUCTS_GETNUMPAGES, URL_PROXY, categoryId, name) {
    pagination.innerHTML = ""
    const filter = name ? `?name=${name}` : `?categoryId=${categoryId}`
    const responseJson = await loadData(URL_PRODUCTS_GETNUMPAGES.concat(filter), URL_PROXY)

    let { pages } = responseJson.data[0]
    for (let step = 0; step < pages; step++) {
        const paginationHTML = buildHTMLPagination(step + 1)
        pagination.appendChild(paginationHTML)
    }
    paginationListener()
}

function displayBreadcrumb(name, categoryId) {
    const paginationHTML = buildHTMLBreadcrumb(toCapital(name), categoryId)
    breadcrumbEL.innerHTML = ''
    breadcrumbEL.appendChild(paginationHTML)
}

async function menuListener() {
    document.querySelectorAll('.nav-item a').forEach((item) => {
        item.addEventListener('click', async (event) => {
            const link = event.target.href;
            const categoryId = getTextAfterHash(link)
            const categoryName = item.innerHTML
            await updateHTML(categoryId, categoryName)
            event.preventDefault()
        });
    });
}

function searchListener() {
    const input = document.querySelector("input[type='search']")

    input.addEventListener('search', async () => {
        const query = input.value
        await updateHTML('', query, '', query)
    });
}

async function paginationListener() {
    document.querySelectorAll('#paginationEL li a').forEach((item) => {
        item.addEventListener('click', async (event) => {
            const pageLink = event.target.href;
            const page = getTextAfterHash(pageLink)
            const categoryLink = breadcrumbEL.getElementsByTagName("a")[0].href;
            const categoryId = getTextAfterHash(categoryLink)
            const categoryName = breadcrumbEL.getElementsByTagName("a")[0].innerHTML;
            const query = !categoryId ? categoryName : ''
            await updateHTML(categoryId, categoryName, page, query)
            event.preventDefault()
        });
    });
}

async function updateHTML(categoryId, categoryName, page = 1, query) {
    await displayItems(galleryEL, URL_PRODUCTS, URL_PROXY, categoryId, page, query)
    await displayPagination(paginationEL, URL_PRODUCTS_GETNUMPAGES, URL_PROXY, categoryId, query)
    displayBreadcrumb(categoryName, categoryId)
    updateActiveCategory(categoryId)
    updateActivePage(page)
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
    await displayAll(sidebarUL, URL_CATEGORIES, URL_PROXY)
    menuListener()
    searchListener()
}
run();
