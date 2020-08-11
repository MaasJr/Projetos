
function populateUFs () {
    const ufSelect = document.querySelector("select[name=uf")
    fetch ("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then( res => res.json() )
    .then( states => {
        for( const state of states ) {
            ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
        }
    })
}

populateUFs()

function getCities(event) {
    const citySelect = document.querySelector("select[name=city")
    const stateInput = document.querySelector("input[name=state")
    console.log(event.target.value)
    const ufValue = event.target.value
    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text

    citySelect.innerHTML = "<option value>Selecione a Cidade</option>"
    citySelect.disabled = true

    fetch (url)
    .then( res => res.json() )
    .then( cities => {
        for( const city of cities ) {
            citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
        }

        citySelect.disabled = false
    })

}

document
    .querySelector("select[name=uf")
    .addEventListener("change", getCities)


// Itens de coleta

const itemsToCollect = document.querySelectorAll(".items-grid li")

for (const item of itemsToCollect) {
    item.addEventListener("click", handleSelectedItem)
}

// Atualizar o campo "hidden" com os dados selecionados.
const collectedItems = document.querySelector("input[name=items")

let selectedItems = []

function handleSelectedItem(event) {
//adicionar ou remover uma classe com js

const itemLi = event.target
    
itemLi.classList.toggle("selected")
    
const itemId = itemLi.dataset.id

// Teste do itemId
// console.log('ITEM ID: ', itemId)

// Verificar se existem itens selecionados, se sim, pegar os itens selecionados.
const alreadySelected = selectedItems.findIndex( item => {
        const itemFound = item == itemId // isso será true ou false
        return itemFound
    })

// Se já estiver selecionado , tirar da seleção.
    if (alreadySelected >= 0) {
        //tirar da seleção
        const filteredItems = selectedItems.filter( item => {
            const itemIsDifferent = item != itemId //false
            return itemIsDifferent
        })

        selectedItems = filteredItems

// Se não estiver selecionado, adicionar à seleção.
    } else {
        selectedItems.push(itemId)
    }

    
    
    // Teste do selectedItems
    // console.log('selectedItems: ', selectedItems)

    // Atualizar o campo "hidden" com os dados selecionados.

   collectedItems.value = selectedItems

}