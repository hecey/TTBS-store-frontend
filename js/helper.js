/**
 * Convierte a capita; un texto
 * @param {string} text
 * @returns {string} Texto convertido a capital
 */
const toCapital = (text) => {
    if(text=="") return ""

    const words = text.split(" ")
    return words.map((word) => {
        return word[0].toUpperCase() + word.substring(1);
    }).join(" ")
}
/**
 * Obtiene el texto después del # del texto
 * @param {string} text
 * @returns {string} texto después del hash en el texto
 */
const getTextAfterHash = (text) => text.substring(text.lastIndexOf('#') + 1)
/**
 * Limpia un elemento HTML de su contenido
 * @param {elementoHTML} el elemento html a limpiar su contenido
  */
const clearElement = (el) => el.innerHTML = ''

export {
    toCapital,
    getTextAfterHash,
    clearElement
}