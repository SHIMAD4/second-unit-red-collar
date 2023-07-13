const container = document.querySelector('#container')
const input = document.querySelector('#input-box')
const submitButton = document.querySelector('#task-submit-btn')

class ToDo {
    constructor() {
        this.span = undefined
        this.elem = undefined
    }
    addTask() {
        if(input.value === '') {
            console.log('Nothing to add')
        } else {
            this.elem = document.createElement('li')
            this.elem.classList.add('todo-app__container__item')
            
            let taskText = document.createElement('span')
            taskText.innerText = input.value
            this.elem.appendChild(taskText)
    
            let editIcon = document.createElement('i')
            editIcon.classList.add('fa-solid')
            editIcon.classList.add('fa-pen-to-square')
            
            let closeIcon = document.createElement('i')
            closeIcon.classList.add('fa-solid')
            closeIcon.classList.add('fa-xmark')
    
            this.elem.appendChild(editIcon)
            this.elem.appendChild(closeIcon)
            container.appendChild(this.elem)
        }
        input.value = ''
        this.saveTasks()
    }
    editTask(target, elem) {
        let editIcon = elem.querySelector('.fa-pen-to-square')
        editIcon.style.display = 'none'

        let editInput = document.createElement('input')
        let editSaveButton = document.createElement('button')

        editInput.setAttribute('type', 'text')
        editInput.classList.add('todo-app__input')
        editInput.style.margin = '0px 0px 0px 20px'
        editInput.value = target.innerText

        editSaveButton.innerText = 'save'
        editSaveButton.classList.add('btn')

        elem.appendChild(editInput)
        elem.appendChild(editSaveButton)
        
        editSaveButton.addEventListener('click', () => {
            editIcon.style.display = 'block'
            editInput.remove()
            editSaveButton.remove()
            target.innerText = editInput.value
            this.saveTasks()
        })
    }
    saveTasks() {
        localStorage.setItem('tasks', container.innerHTML)
    }
    showTasks() {
        container.innerHTML = localStorage.getItem('tasks')
    }
    checkTarget(e) {
        if(e.target.tagName === 'SPAN') {
            e.target.classList.toggle('checked')
            todo.saveTasks()
        } else if (e.target.classList.contains('fa-xmark')) {
            e.target.parentElement.remove()
            todo.saveTasks()
        }
        else if (e.target.classList.contains('fa-pen-to-square')) {
            const parentElem = e.target.parentElement
            todo.editTask(parentElem.querySelector('span'), parentElem)
            todo.saveTasks()
        }        
    }
}

const todo = new ToDo()
submitButton.addEventListener('click', () => todo.addTask())

container.addEventListener('click', (e) => todo.checkTarget.call(todo, e))

todo.showTasks()