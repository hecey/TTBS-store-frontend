export function toCapital(text) {
    const words = text.split(" ");
    return words.map((word) => {
        return word[0].toUpperCase() + word.substring(1);
    }).join(" ");
}
export function getTextAfterHash(text) {
    return text.substring(text.lastIndexOf('#') + 1);
}

export function spinner(el, display){
    if(display)
        el.innerHTML = '<div class="spinner-border text-primary" role="status"><span class="visually-hidden"></span></div>'
    else
        el.innerHTML =''
}

export function clearElement(el){
    el.innerHTML = ''
}