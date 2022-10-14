import { toCapital, getTextAfterHash } from "../js/helper.js";
import { buildHTMLItem } from "../js/item.js";
import { buildHTMLCategory } from "../js/category.js";
import { buildHTMLPagination } from "../js/pagination.js";
import { buildHTMLBreadcrumb } from "../js/breadcrumb.js";

const URL_PROXY = 'https://young-meadow-11122.herokuapp.com/'
const URL_CATEGORIES = 'https://frozen-dawn-70616.herokuapp.com/categories'
const URL_PRODUCTS = 'https://frozen-dawn-70616.herokuapp.com/products'
const URL_PRODUCTS_GETNUMPAGES = 'https://frozen-dawn-70616.herokuapp.com/products/getNumPages'

const ulEL = document.getElementById('sidebarUL')
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

async function displayMenu(ul, URL_CATEGORIES, URL_PROXY) {

    const responseJson = await loadData(URL_CATEGORIES, URL_PROXY)
    let {name}  = responseJson.data[0]
    let {id}  = responseJson.data[0]
    displayBreadcrumb(name,id)

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
    let filter = `?`
    filter += name ? `name=${name}` : `categoryId=${categoryId}`

    const responseJson = await loadData(URL_PRODUCTS_GETNUMPAGES.concat(filter), URL_PROXY)

    let {pages}  = responseJson.data[0]
    for (let step = 0; step < pages; step++) {
        const paginationHTML = buildHTMLPagination(step+1)
        pagination.appendChild(paginationHTML)
    }
}

function displayBreadcrumb(name,categoryId){
    const paginationHTML=buildHTMLBreadcrumb(toCapital(name),categoryId)
    breadcrumbEL.innerHTML=''
    breadcrumbEL.appendChild(paginationHTML)
}

async function menuListener() {
    document.querySelectorAll('.nav-item a').forEach((item) => {
        item.addEventListener('click', async (event) => {
            const link = event.target.href;
            const categoryId = getTextAfterHash(link)
            const categoryName = item.innerHTML
            await updateHTMLbyCategory(categoryId,categoryName)
            event.preventDefault()
        });
    });
}

function searchListener() {
    const input = document.querySelector("input[type='search']")

    input.addEventListener('search', async () => {
        const query = input.value
        console.log(`The term searched for was ${input.value}`);
        await displayItems(galleryEL, URL_PRODUCTS, URL_PROXY, '', '', query)
        await displayPagination(paginationEL, URL_PRODUCTS_GETNUMPAGES, URL_PROXY, '', query)
        displayBreadcrumb(query,'')
    });

}

async function paginationListener() {
    document.querySelectorAll('#paginationEL li a').forEach((item) => {
        item.addEventListener('click', async (event) => {
            const link = event.target.href;
            const categoryId = getTextAfterHash(link)
            const categoryName=item.innerHTML;
            await updateHTMLbyCategory(categoryId,categoryName)
            event.preventDefault()
        });
    });
}

async function updateHTMLbyCategory(categoryId=1,categoryName){
    await displayItems(galleryEL, URL_PRODUCTS, URL_PROXY, categoryId)
    await displayPagination(paginationEL, URL_PRODUCTS_GETNUMPAGES, URL_PROXY, categoryId)
    displayBreadcrumb(categoryName,categoryId)
}

async function run() {
    await displayMenu(ulEL, URL_CATEGORIES, URL_PROXY)
    await displayItems(galleryEL, URL_PRODUCTS, URL_PROXY, 1)
    await displayPagination(paginationEL, URL_PRODUCTS_GETNUMPAGES, URL_PROXY, 1)
    menuListener();
    searchListener();
}
run();
