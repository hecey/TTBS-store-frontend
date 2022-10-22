/**
 * Genera el html para mostrar un item en la tarjeta
 * @param {number} id id de producto
 * @param {string} name nombre de producto
 * @param {url} url_image ruta a la imagen
 * @param {number} price precio del producto
 * @param {number} discount descuento del producto
 * @returns {html}
 */
export const buildHTMLItem = (id, name, url_image, price, discount) => {
    const image = (!url_image == '')
        ? `<img class="img-fluid img-thumbnail"
                style="border:0;height: auto;max-width: 100%;max-height: 180px;"
                src="${url_image}">`
        : `<img alt="File:Picture icon BLACK.svg" src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Picture_icon_BLACK.svg/149px-Picture_icon_BLACK.svg.png?20180309172929" decoding="async" srcset="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Picture_icon_BLACK.svg/224px-Picture_icon_BLACK.svg.png?20180309172929 1.5x, https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Picture_icon_BLACK.svg/298px-Picture_icon_BLACK.svg.png?20180309172929 2x" data-file-width="149" data-file-height="132" width="149" height="132">`

    return `
    <div class="d-flex flex-fill">
        <div class="d-flex flex-fill card shadow-sm m-1">
            <div class="p-2 d-flex aligns-items-center justify-content-center "  style="heigh:280px;">
            <div class="d-flex  flex-column aligns-items-center justify-content-center p-0 m-0 h-100" style="height:100%;min-height: 180px;">
                ${image}
            </div>
            </div>
            <div class="row p-2 m-2 aligns-items-center  justify-content-center card-body bg-secondary text-white "  >
                <div class="d-flex  flex-column  p-0 m-0 h-100" style="height:100%">
                    <div class="  p-0 m-0">
                        <p class="m-0 my-auto" card-text">${name}</p>
                    </div>
                    <div class="mt-auto  p-0 m-0 w-100 "  >
                        <button class="btn p-1 m-0 my-1 btn-sm btn-primary w-100" >Price: ${price}</button>
                        <button class="btn p-1 m-0 my-1 btn-sm btn-warning w-100" >Discount: ${discount}</button>
                    </div>
                </div>
            </div>
        </div>
    </div>`
}