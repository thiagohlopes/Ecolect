const buttomSearch = document.querySelector("#page-home main a")
const modal = document.querySelector ("#modal")
const close = document.querySelector("#modal .header a")/*vai pegar o a dentro do header e dentro do modal */

buttomSearch.addEventListener("click", () => {
    modal.classList.remove("hide")
})

close.addEventListener("click", () => {
    modal.classList.add("hide")
})