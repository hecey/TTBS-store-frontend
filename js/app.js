import { renderAll } from "./render.js"
import { menuListener, searchListener } from "../js/listener.js"

/**
 * Punto de entrada para la carga de datos desde el backend y renderización de elementos.
 */
async function run() {
    const config = await import("../js/config.js")
    await renderAll(config)
    menuListener(config)
    searchListener(config)
}
run()