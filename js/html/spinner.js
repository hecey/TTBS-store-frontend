export const spinner = (el, display) => {
    (display) ? el.innerHTML = '<div class="spinner-border text-primary" role="status"><span class="visually-hidden"></span></div>'
    : el.innerHTML = ''
}
