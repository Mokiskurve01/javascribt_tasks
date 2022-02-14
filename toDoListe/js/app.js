'use strict';

const KEY_ENTER = 13

const getId = (() => {
  let counter = 1

  return () => {
    counter++
    return counter
  }
})()


const todoModule = {
  todos: [],

  /**
   * @param {string} title
   */
  addTodo(title) {
    const newTodo = {
      id: getId(),
      title: title,
      done: false
    }
    this.todos.push(newTodo)
    this.emit("add", newTodo)
  },

  removeCompletedTodos() {
    for (const todo of this.todos) {
      if (todo.done) {
        this.removeTodo(todo.id)
      }
    }
  },

  /**
   * @param {number} id 
   */
  removeTodo(id) {
    for (const index in this.todos) {
      const todo = this.todos[index]
      if (todo.id === id) {
        this.todos.splice(index, 1)
        this.emit("remove", todo)
      }
    }
  },

  /**
   * @param {number} id
   */
  completeTodo(id) {
    for (const todo of this.todos) {
      if (todo.id === id && todo.done === false) {
        todo.done = true
        this.emit("changeTodo", todo)
      }
    }
  },
  /**
   * @param {number} id
   */
  unCompleteTodo(id) {
    for (const todo of this.todos) {
      if (todo.id === id && todo.done === true) {
        todo.done = false
        this.emit("changeTodo", todo)
      }
    }
  },

  /**
   * @returns {number}
   */
  getTodoCount() {
    let todoCount = 0
    for (const todo of this.todos) {
      if (todo.done === false) {
        todoCount++
      }
    }
    return todoCount
  },


  events: {},
  /**
   * Löst ein Ereignis aus. Dieser Funktion dürfen beliebig viele
   * params übergeben werden, diese werden 1:1 an die Event-Listener
   * durchgereicht.
   *
   * @param {string} eventName
   * @param {*=} params
   */
  emit(eventName, param) {
    if (eventName in this.events) {
      for (const f of this.events[eventName]) {
        f(param)
      }
    }
  },

  /**
   * Registriert einen Event-Listener für das Event eventName.
   *
   * @param {string} eventName
   * @param {Function} cb
   */
  on(eventName, cb) {
    // Hier ist die Klammersetzung ganz wichtig!
    if (!(eventName in this.events)) {
      this.events[eventName] = []
    }
    this.events[eventName].push(cb)
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const elements = {
    newTodo: document.querySelector(".new-todo"),
    todoList: document.querySelector(".todo-list"),
    footer: document.querySelector(".footer"),
    todoCount: document.querySelector(".todo-count strong"),
    clearCompleted: document.querySelector(".clear-completed"),
  }

  // Button: Fertiggestellte Todos löschen!
  elements.clearCompleted.addEventListener("click", (event) => {
    todoModule.removeCompletedTodos()
  })

  // Ein neues Todo soll hinzugefügt werden
  elements.newTodo.addEventListener("keypress", (event) => {
    if (event.keyCode === KEY_ENTER) {
      const todoTitle = elements.newTodo.value
      if (todoTitle !== "") {
        todoModule.addTodo(todoTitle)
        elements.newTodo.value = ""
      }
    }
  })

  // Wenn ein Todo hinzugefügt wird -> Zeige es im Browser an!
  todoModule.on("add", (todo) => {
    const newButtonElement = document.createElement("button")
    newButtonElement.classList.add("destroy")

    newButtonElement.addEventListener("click", (event) => {
      todoModule.removeTodo(todo.id)
    })

    const newLabelElement = document.createElement("label")
    newLabelElement.appendChild(
      document.createTextNode(todo.title)
    )

    const newInputCheckbox = document.createElement("input")
    newInputCheckbox.type = "checkbox"
    newInputCheckbox.classList.add("toggle")

    newInputCheckbox.addEventListener("change", (event) => {
      const checkboxChecked = newInputCheckbox.checked
      if (checkboxChecked) {
        todoModule.completeTodo(todo.id)
      } else {
        todoModule.unCompleteTodo(todo.id)
      }
    })

    const newDivElement = document.createElement("div")
    newDivElement.classList.add("view")
    newDivElement.appendChild(newInputCheckbox)
    newDivElement.appendChild(newLabelElement)
    newDivElement.appendChild(newButtonElement)

    const newLiElement = document.createElement("li")
    newLiElement.setAttribute("data-id", todo.id)
    newLiElement.appendChild(newDivElement)


    elements.todoList.prepend(newLiElement)
  })

  // Wenn ein Todo gelöscht wird!
  todoModule.on("remove", (todo) => {
    const liElement = elements.todoList.querySelector("li[data-id='" + todo.id + "']")
    liElement.remove()
  })

  // Wenn ein Todo fertiggestellt wird bzw. dies zurückgenommen wird
  todoModule.on("changeTodo", (todo) => {
    // "li[data-id='3']"
    const liElement = elements.todoList.querySelector("li[data-id='" + todo.id + "']")
    if (todo.done) {
      liElement.classList.add("completed")
    } else {
      liElement.classList.remove("completed")
    }
  })
  // UUID

  // Footer-Anzeige aktualisieren
  const refreshFooter = () => {
    elements.todoCount.innerText = todoModule.getTodoCount()
  }
  todoModule.on("add", refreshFooter)
  todoModule.on("remove", refreshFooter)
  todoModule.on("changeTodo", refreshFooter)


});