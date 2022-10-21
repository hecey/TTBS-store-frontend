export const buildHTMLItem = (id, name, url_image, price, discount) => {
    return `
    <div class="d-flex flex-fill">
        <div class="d-flex flex-fill card shadow-sm m-1">
            <div class="p-2 d-flex aligns-items-center justify-content-center "  style="heigh:280px;">
                <img class="img-fluid img-thumbnail " style="border:0;height: auto;max-width: 100%;max-height: 180px;min-height: 180px;" src="${!url_image == '' ? url_image : "/images/image-not-found-icon.svg"}" >
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