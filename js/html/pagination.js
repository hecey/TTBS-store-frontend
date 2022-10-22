/**
 * Genera elemento HTML para numeración de paginas
 * @param {number} number numero de pagina
 * @returns {html}
 */
export const buildHTMLPagination = (number) => {
    return `<li class="page-item">
                <a href="#${number}" class="page-link">${number}</a>
            </li>`
}