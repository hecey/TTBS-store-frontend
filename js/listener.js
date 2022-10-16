import { getTextAfterHash } from "../js/helper.js"
import { updateHTML } from "./render.js"

const paginationListener = async (config) => {
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


const menuListener = async (config) => {
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

const searchListener = (config) => {
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

export {
    paginationListener,
    menuListener,
    searchListener
}