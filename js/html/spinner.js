export const spinner = (el, display) => {
    (display) ? el.innerHTML = '<div class="spinner-border text-primary px-2 mx-3" role="status"><span class="visually-hidden"></span></div>'
    : el.innerHTML = ''
}
