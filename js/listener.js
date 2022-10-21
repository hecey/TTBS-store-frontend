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
            event.preventDefault()
            let el = event.currentTarget
            if(el.tagName!="A")
                el=el.parentElement
            const categoryId = getTextAfterHash(el.href)
            const categoryName = el.textContent.replace(/(\r\n|\n|\r)/gm, "").trim()
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

    input.addEventListener('keyup', async (event) => {

        const query = input.value
        const filter = {
            categoryId: '',
            categoryName: query,
            page: 1,
            query: query
        };

        if (event.keyCode === 13 || event.keyCode === "") {
            await updateHTML(config, filter)
        }
        event.preventDefault()
    });
}

export {
    paginationListener,
    menuListener,
    searchListener
}