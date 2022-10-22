/**
 * Genera html de spinner para carga de pagina
 * @param {Element} el elemento donde se mostrara el spinner
 * @param {boolean} display Evalúa si debe mostrar o ocultar el spinner
 * @returns {html}
 */
export const spinner = (el, display) => {
    (display)
        ? el.innerHTML = `<div class="spinner-border text-primary px-2 mx-3" role="status">
                                <span class="visually-hidden"></span>
                         </div>`
        : el.innerHTML = ''
}
