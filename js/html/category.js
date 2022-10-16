import { toCapital } from "../helper.js";
export const buildHTMLCategory = (id, name) => {
    return `<li class="nav-item"><a href="#${id}" class="nav-link">${toCapital(name)}</a></li>`
}