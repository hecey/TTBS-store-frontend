export function buildHTMLItem(id, name, url_image, price, discount){
    const divCol = document.createElement("div")
        divCol.setAttribute("class", 'col')
        const divShadow = document.createElement("div")
        divShadow.setAttribute("class", 'card shadow-sm')
        divCol.appendChild(divShadow)

        const divImage = document.createElement("div")
        divImage.setAttribute("class", 'border d-flex aligns-items-center justify-content-center')
        divShadow.appendChild(divImage)

        const img  = document.createElement("img")
        img.setAttribute("class", 'bd-placeholder-img  py-2 px-2 ')
        img.setAttribute("src", `${!url_image=='' ? url_image :"/images/image-not-found-icon.svg"}`)
        img.setAttribute("height", '200px')
        //img.setAttribute("width", '')
        divImage.appendChild(img)

        const divCard = document.createElement("div")
        divCard.setAttribute("class", 'card-body bg-secondary text-white')
        divShadow.appendChild(divCard)

        const p = document.createElement("p")
        p.innerHTML = name
        p.setAttribute("class", 'card-text')
        divCard.appendChild(p)

        const divGroup = document.createElement("div")
        divGroup.setAttribute("class", 'd-flex justify-content-between align-items-center')
        divCard.appendChild(divGroup)

        const buttonPrice = document.createElement("button")
        buttonPrice.setAttribute("class", 'btn btn-sm btn-primary')
        buttonPrice.innerHTML = `Price: ${price}`
        divGroup.appendChild(buttonPrice)

        const buttonDiscount = document.createElement("button")
        buttonDiscount.setAttribute("class", 'btn btn-sm btn-warning')
        buttonDiscount.innerHTML = `Discount: ${discount}`
        divGroup.appendChild(buttonDiscount)

        return divCol
}