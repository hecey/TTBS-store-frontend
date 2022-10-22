/**
 * Genera el html necesario para la migaja de pan
 * @param {string} text
 * @param {number} categoryId
 * @returns {html}
 */
export const buildHTMLBreadcrumb = (text, categoryId) => {
    return `<a href='#${categoryId}'>${text}</a>`
}