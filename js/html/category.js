import { toCapital } from "../helper.js";
/**
 * Generate html li element for category
 * @param {number} id Id de categoría
 * @param {string} name Nombre de categoría
 * @returns {html}
 */
export const buildHTMLCategory = (id, name) => {
    return `
    <li class="nav-item w-100 ">
        <a href="#${id}" class="nav-link   pl-sm-3">
        <i class="fs-5 bi bi-${id}-square"></i><span class="ms-1 d-none d-sm-inline">
        ${toCapital(name)}</span>
        </a>
        </li>`
}