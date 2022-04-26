const elemsToDo = JSON.parse(localStorage.getItem('elemsToDo'))
const inputText = document.querySelector('.input')
const todos = document.querySelector('.todos')
const clearBtn = document.querySelector('.btn-clear')

let id = 1
let idItem = 0
const list = []
let editFlag = false
if(elemsToDo){
    elemsToDo.forEach((elemToDo) =>{
        addTodo(elemToDo.textTodo)
        addELementInList(elemToDo.textTodo)
    })
}

visbleClearBtn()



inputText.addEventListener('keydown', (e)=>{
    if(e.keyCode === 13) {
        if(editFlag){
            let text = inputText.value
            list[idItem-1].textTodo = text
            addLocalStorage()
            editFlag = false
            defaltInput() 
        } else{
            let text = inputText.value
            e.preventDefault()
            addTodo(text)
            addELementInList(text)
            addLocalStorage()
            defaltInput()    
        }
        
    }
 
})

function defaltInput(){
    inputText.value = ''
    visbleClearBtn()
}

function addELementInList(text){
    const todoList = {
        idTodo: id,
        textTodo: text
    }
    list.push(todoList)
    id++
}

function deleteItem(e){
    const element = e.currentTarget.parentElement
    const elemid = element.getAttribute('id')
    
    document.body.querySelector('.todos').removeChild(element)
    
    list.forEach(function(elem,i){
        
        if(elem.idTodo == elemid){
            list.splice(i, 1)
        } 
   
            
    })
    list.forEach(function(elem,i){

          if (elem.idTodo > elemid) {
             editList(elem.idTodo,i)
            }
    })
    id--
    visbleClearBtn()
}

function editList (e,i) {
    const todoE = document.getElementById(e)
    e--
    let elementArr = list[i]
    elementArr.idTodo = e
    todoE.setAttribute('id', e)
    const textE = todoE.querySelector('span')
    textE.textContent = `${e}.`
    
}

function visbleClearBtn(){
    if(list.length>0){
        clearBtn.classList.remove('_hidden')
        console.log(list)
    }else{
        clearBtn.classList.add ('_hidden')
    }
}

clearBtn.addEventListener('click',()=>{
    clearListTodo()
})

function clearListTodo(){
    list.splice(0, list.length)
    id = 0
    addLocalStorage()
    const element = document.querySelectorAll('li')
    element.forEach((elem)=>{
        document.body.querySelector('.todos').removeChild(elem)
    })
    visbleClearBtn()
}

function addTodo(text){
   const todo = document.createElement('li')
    todo.setAttribute('id', id)
    todo.innerHTML = `
        <button type='button' class="btn-delete"><ion-icon name="trash-outline"></ion-icon></button>
        <span>${id}.</span><span class='textTodo'>${text}</span>
        `
        
    const deleteBtn = todo.querySelector('.btn-delete')
    deleteBtn.addEventListener('click', (e)=>{
        deleteItem(e)
        addLocalStorage()
    })
    const editList = todo.querySelector('.textTodo')
    editList.addEventListener('click',()=>{
        editItemList(todo,text)
    })
    
    document.body.querySelector('.todos').appendChild(todo)
   
    
}

function editItemList(todo,text){  
    idItem = todo.id
    inputText.value = text
    inputText.focus()
    editFlag = true

    }

function addLocalStorage() {
   
    localStorage.setItem("elemsToDo", JSON.stringify(list));
}