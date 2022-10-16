import { renderAll } from "./render.js"
import { menuListener, searchListener } from "../js/listener.js"

async function run() {
    const config = await import("../js/config.js")
    await renderAll(config)
    menuListener(config)
    searchListener(config)
}
run()