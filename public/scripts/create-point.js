
function populateUFs(){
    const ufSelect =document.querySelector("select[name=uf]")

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then( (res) => {return res.json() })//como tenho apenas um valor no parenteses e retorno apenas um valor, nao preciso do parenteses nem do return nem da chave
    .then( states =>{
        for(state of states) {//pega cada stado da linha de stado 'states', e coloca na variavel state, um por um
            ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
        }
    } )
}

populateUFs()

function getCities(event) {
    const citySelect =document.querySelector("select[name=city]")
    const stateInput =document.querySelector("input[name=state]")

    const ufValue = event.target.value

    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    citySelect.innerHTML ="<option value>Selecione a Cidade</option>"
    citySelect.disabled = true

    fetch(url)
    .then( (res) => {return res.json() })
    .then( cities =>{
        
        for(city of cities) {
            citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
        }
        citySelect.disabled = false//pega o evento que estava desabilitado e ativa ele
    } )

}

document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities)

//  itens de coleta
const itemsToCollect = document.querySelectorAll(".items-grid li")//pega todos os li's

for (const item of itemsToCollect){//coloca um ouvidor de eventos nos itens
    item.addEventListener("click", handleSelectedItem)
}

const collectedItems = document.querySelector("input[name=items")

let selectedItems = []

function handleSelectedItem(event){
    const ItemLi = event.target
    //adicionar ou remover uma classe com java script
    ItemLi.classList.toggle("selected")//adiciona se n tiver e remove se tiver
    const itemId = ItemLi.dataset.id
    
    //verificar se existe selecionado, se sim, pega-los
    const alreadySelected = selectedItems.findIndex( function(item){
        const itemFound = item == itemId// retorna true se encontrou e false se não
        return itemFound
    })// tudo isso poderia ser substituido por airfunction
    //const alreadySelected = selectedItems.findIndex( item => item == itemId)

    //se já estiver selecionado retira da seleção
    if(alreadySelected >= 0) {
        //tirar da seleção 49:50
        const filteredItems = selectedItems.filter( item => {
            const itemIsDifferent = item != itemId
            return itemIsDifferent
        })
        selectedItems = filteredItems
    } else {
        // se não estiver selecionado, adicionar a seleção
        selectedItems.push(itemId)
    }
    //atualizar o campo hidem com os itens 
    collectedItems.value = selectedItems
    
}

