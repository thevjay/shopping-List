const itemForm=document.getElementById('item-form')
const itemInput=document.getElementById('item-input')
const itemList=document.getElementById('item-list')
//Part-2
const clearBtn=document.getElementById('clear')
const itemFilter=document.getElementById('filter')

//update
const formBtn=itemForm.querySelector('button')
let isEditMode=false


function displayItems(){
    const itemFromStorage=getItemsFromStorage()
    itemFromStorage.forEach(item=>addItemToDOM(item))

    checkUI()

}

function onAddItemSubmit(e){
    e.preventDefault()
    const newItem=itemInput.value
    //Validate Input
    if(newItem===''){
        alert('Please add an item')
        return
    }

    //Check for edit mode
    if(isEditMode){
        const itemToEdit=itemList.querySelector(".edit-mode")

        removeItemFromStorage(itemToEdit.textContent)
        itemToEdit.classList.remove('edit-mode')
        itemToEdit.remove()
        isEditMode=false
    }else{
        if(checkIfItemExists(newItem)){
            alert('That item already exists!')
            return
        }
    }



    //console.log('success')
    //console.log(li)

    //Create item DOM element
    addItemToDOM(newItem)

    //Add item to local storage
    addItemToStorage(newItem)

    checkUI()
    itemInput.value=''
}
function addItemToDOM(item){
    //Create list item
    const li=document.createElement('li')
    li.appendChild(document.createTextNode(item))

    const button=createButton('remove-item btn-link text-red')
    li.appendChild(button)

    //Add li to the DOM
    itemList.appendChild(li)
}

function addItemToStorage(item){
    const itemFromStorage=getItemsFromStorage()

    //Add new item to array
    itemFromStorage.push(item)

    //Covert to JSON string and set to local storage
    localStorage.setItem('items',JSON.stringify(itemFromStorage))
}

function getItemsFromStorage(){
    let itemFromStorage

    if(localStorage.getItem('items')===null){
        itemFromStorage=[]
    }else{
        itemFromStorage=JSON.parse(localStorage.getItem('items'))
    }
    return itemFromStorage
}


function createButton(classes){
    const button=document.createElement('button')
    button.className=classes
    const icon=createIcon('fa-solid fa-xmark')
    button.appendChild(icon)
    return button
}

function createIcon(classes){
    const icon=document.createElement('i')
    icon.className=classes
    return icon
}

function onClickItem(e){
    if(e.target.parentElement.classList.contains('remove-item')){
        removeItem(e.target.parentElement.parentElement)
    }else{
        //console.log(1)
        setItemToEdit(e.target)
    }
}

function checkIfItemExists(item){
    const itemFromStorage=getItemsFromStorage()
    if(itemFromStorage.includes(item))
}

function setItemToEdit(item){
    isEditMode=true

    itemList.querySelectorAll('li')
    .forEach((i)=> i.classList.remove('edit-mode'))

    item.classList.add('edit-mode')
    formBtn.innerHTML='<i class="fa-solid fa-pen"></i> Update Item'
    formBtn.style.background="#228B22"
    itemInput.value=item.textContent

}

//Part -2
function removeItem(item){
    if(confirm('Are you sure')){
        //Remove item from DOM
        item.remove()

        //Remove item from storage
        removeItemFromStorage(item.textContent)

        checkUI()
    }
    //console.log(item)
    //if(e.target.parentElement.classList.contains('remove-item')){
        ///console.log('click')
    //    if(confirm('Are you sure')){
    //        e.target.parentElement.parentElement.remove()
    //        checkUI()
    //    }

 //   }
}

function removeItemFromStorage(item){
    let itemFromStorage=getItemsFromStorage()
    
    //Filter out item to be removed
    itemFromStorage=itemFromStorage.filter(()=> item!== item)

    //Re-set to localstorage
    localStorage.setItem('item',JSON.stringify(itemFromStorage))

    //console.log(itemFromStorage)
}
function clearItems(){
    //console.log('works');
    while(itemList.firstChild){
        itemList.removeChild(itemList.firstChild)
    }
    //Clear from localStorage
    localStorage.removeItem('items')
    checkUI()
}
    //Part-3
function filterItems(e){
    const items=itemList.querySelectorAll('li')
    const text=e.target.value.toLowerCase()
        //console.log(text)
    items.forEach(item=>{
        const itemName=item.firstChild.textContent.toLocaleLowerCase()
        if(itemName.indexOf(text)!=-1){
            item.style.display='flex'
            //console.log(true)
        }else{
            item.style.display='none'
            //console.log(false)
        }
        //console.log(itemName)
        //console.log(item)
    })
    //console.log(text)
}


function checkUI(){
    itemInput.value=''

    const items=itemList.querySelectorAll('li')
    //console.log(items)
    if(items.length===0){
        clearBtn.style.display='none'
        itemFilter.style.display='none'
    }else{
        clearBtn.style.display='block'
        itemFilter.style.display='block'
    }
    formBtn.innerHTML='<i class="fa-solid fa-plus"></i>Add Item'
    formBtn.style.backgroundColor='#333'

    isEditMode=false
}

// Initialize app
function init(){
    //Event Listeners
    itemForm.addEventListener('submit',onAddItemSubmit)
    //<-- part2-->
    itemList.addEventListener('click',onClickItem)
    clearBtn.addEventListener('click',clearItems)
    itemFilter.addEventListener('input',filterItems)
    document.addEventListener('DOMContentLoaded',displayItems)

    checkUI()
}
init()

