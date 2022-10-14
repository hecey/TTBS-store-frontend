export function buildHTMLItem(id, name, url_image, price, discount){
    const divCol = document.createElement("div")
        divCol.setAttribute("class", 'col')
        const divShadow = document.createElement("div")
        divShadow.setAttribute("class", 'card shadow-sm')
        divCol.appendChild(divShadow)

        const divImage = document.createElement("div")
        divImage.setAttribute("class", 'border d-flex aligns-items-center')
        divImage.setAttribute("style", 'height: 250px;')
        divShadow.appendChild(divImage)

        const img  = document.createElement("img")
        img.setAttribute("class", 'bd-placeholder-img card-img-top py-4 px-2 w-75  mx-auto d-block ')
        img.setAttribute("src", `${!url_image=='' ? url_image :"/images/image-not-found-icon.svg"}`)
        img.setAttribute("height", '250')
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

        const divGroupButton = document.createElement("div")
        divGroupButton.setAttribute("class", 'd-grid gap-2 d-md-block')
        divGroup.appendChild(divGroupButton)

        const buttonPrice = document.createElement("button")
        buttonPrice.setAttribute("class", 'btn btn-sm btn-primary')
        buttonPrice.innerHTML = `Price: ${price}`
        divGroupButton.appendChild(buttonPrice)

        const buttonDiscount = document.createElement("button")
        buttonDiscount.setAttribute("class", 'btn btn-sm btn-primary')
        buttonDiscount.innerHTML = `Discount: ${discount}`
        divGroupButton.appendChild(buttonDiscount)

        const small = document.createElement("small")
        small.setAttribute("class", 'text-muted')
        divGroup.appendChild(small)
        return divCol
}