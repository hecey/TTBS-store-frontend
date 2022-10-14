export function buildHTMLPagination(number){

    const li = document.createElement("li")
    const anchor = document.createElement("a")

    li.setAttribute("class", 'page-item')

    anchor.appendChild(document.createTextNode(number))
    anchor.setAttribute("href", `#${number}`)
    anchor.setAttribute("class", "page-link") //active

    li.appendChild(anchor)
    return li
}