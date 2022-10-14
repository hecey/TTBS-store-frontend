export function buildHTMLBreadcrumb(text,categoryId){

    const anchor = document.createElement("a")
    anchor.appendChild(document.createTextNode(text))
    anchor.setAttribute("href", `#${categoryId}`)
    //anchor.setAttribute("class", "page-link") //active

    return anchor
}