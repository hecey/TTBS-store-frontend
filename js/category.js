import { toCapital } from "../js/helper.js";
export function buildHTMLCategory(id, name){
    name = toCapital(name)
    const li = document.createElement("li")
    const anchor = document.createElement("a")

    li.setAttribute("class", 'nav-item')

    anchor.appendChild(document.createTextNode(name))
    anchor.setAttribute("href", `#${id}`)
    anchor.setAttribute("class", "nav-link") //active

    li.appendChild(anchor)
    return li
}