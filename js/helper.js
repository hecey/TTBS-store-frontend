export function toCapital(text) {
    return text.charAt(0).toUpperCase() + text.slice(1);
}
export function getTextAfterHash(text) {
    return text.substring(text.lastIndexOf('#') + 1);
}