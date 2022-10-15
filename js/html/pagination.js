export function buildHTMLPagination(number){
    return `<li class="page-item"><a href="#${number}" class="page-link">${number}</a></li>`
}