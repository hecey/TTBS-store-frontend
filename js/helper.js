const toCapital = (text) => {
    if(text=="") return ""

    const words = text.split(" ")
    return words.map((word) => {
        return word[0].toUpperCase() + word.substring(1);
    }).join(" ")
}
const getTextAfterHash = (text) => text.substring(text.lastIndexOf('#') + 1)
const clearElement = (el) => el.innerHTML = ''

export {
    toCapital,
    getTextAfterHash,
    clearElement
}