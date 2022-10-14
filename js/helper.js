export function toCapital(text) {
    const words = text.split(" ");
    return words.map((word) => {
        return word[0].toUpperCase() + word.substring(1);
    }).join(" ");
}
export function getTextAfterHash(text) {
    return text.substring(text.lastIndexOf('#') + 1);
}