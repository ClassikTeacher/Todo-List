const inputText = document.querySelector('.input')
const todos = document.querySelector('.todos')

let id = 1
const list = []


inputText.addEventListener('keydown', (e)=>{
    if(e.keyCode === 13) {
        let text = inputText.value
        e.preventDefault()
       
        addTodo(text)
        addELementInList(text)
        id++
        defaltInput() 
        console.log(list)
    }
 
})

function defaltInput(){
    inputText.value = ''
}

function addELementInList(text){
    const todoList = {
        idTodo: id,
        textTOdo: text
    }
    list.push(todoList)
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

function addTodo(text){
   const todo = document.createElement('li')
    todo.setAttribute('id', id)
    todo.innerHTML = `
        <button type='button' class="btn-delete"><ion-icon name="trash-outline"></ion-icon></button>
        <span>${id}.</span> ${text} 
        `
    const deleteBtn = todo.querySelector('.btn-delete')
    deleteBtn.addEventListener('click', deleteItem)

    document.body.querySelector('.todos').appendChild(todo)
    
}