export const buildHTMLItem = (id, name, url_image, price, discount) => {
    return `<div class="col" ><div class="card shadow-sm m-1" >
    <div class="border d-flex aligns-items-center justify-content-center ">
    <img class="bd-placeholder-img  py-2 px-2 " src="${!url_image == '' ? url_image : "/images/image-not-found-icon.svg"}" height="200px">
    </div>
    <div class="card-body bg-secondary text-white"><p class="card-text">${name}</p>
    <div class="d-flex justify-content-between align-items-center">
    <button class="btn btn-sm btn-primary">Price: ${price}</button>
    <button class="btn btn-sm btn-warning">Discount: ${discount}</button>
    </div></div></div></div>`
}