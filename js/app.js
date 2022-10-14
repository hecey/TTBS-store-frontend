import { getTextAfterHash } from "../js/helper.js";
import { buildHTMLItem } from "../js/item.js";
import { buildHTMLCategory } from "../js/category.js";

const URL_PROXY = 'https://young-meadow-11122.herokuapp.com/'
const URL_CATEGORIES = 'https://frozen-dawn-70616.herokuapp.com/categories'
const URL_PRODUCTS = 'https://frozen-dawn-70616.herokuapp.com/products'

const ulEL = document.getElementById('sidebarUL')
const galleryEL = document.getElementById('galleryEL')

async function loadData(URL, URL_PROXY) {
    const fullURL=URL_PROXY+URL
    return fetch(fullURL, {
        method: 'GET',
    })
        .then(response => response.json())
        .then(responseJson => { return responseJson })
        .catch(err => console.warn('Something went wrong.', err))
}

async function displayMenu(ul, URL_CATEGORIES, URL_PROXY) {

    const responseJson = await loadData(URL_CATEGORIES, URL_PROXY)

    for (let { id, name } of responseJson.data) {
        const categoryHTML = buildHTMLCategory(id, name)
        ul.appendChild(categoryHTML)
    }
}

async function menuListener() {
    document.querySelectorAll('.nav-item a').forEach((item) => {
        item.addEventListener('click', async (event) => {
            const link = event.target.href;
            const categoryId = getTextAfterHash(link)
            await displayItems(galleryEL, URL_PRODUCTS, URL_PROXY, categoryId)

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

    });

}

async function displayItems(gallery, URL_PRODUCTS, URL_PROXY, categoryId, page = 1, name) {
    gallery.innerHTML = ""
    let filter = `?page=${page ? page:1}&`
    filter += name ? `name=${name}` : `categoryId=${categoryId}`

    const responseJson = await loadData(URL_PRODUCTS.concat(filter), URL_PROXY)

    for (let { id, name, url_image, price, discount } of responseJson.data) {
        const itemHTML = buildHTMLItem(id, name, url_image, price, discount)
        gallery.appendChild(itemHTML)
    }
}

async function run() {
    await displayMenu(ulEL, URL_CATEGORIES, URL_PROXY)
    await displayItems(galleryEL, URL_PRODUCTS, URL_PROXY, 1)
    menuListener();
    searchListener();
}
run();