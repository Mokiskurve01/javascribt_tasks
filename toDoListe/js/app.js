// Strikter Modus für komplettes Skript
"use strict"
//keyCode der Entertaste
const KEY_ENTER = 13
//HTML-Dokument vollständig geladen 
document.addEventListener("DOMContentLoaded", () => {
  //abfrage des elements des eingabefeldes
  const newToDoElement = document.querySelector(".new-todo")
  //die gesamte ul list
  const todoListElement = document.querySelector(".todo-list")
  const footerElement = document.querySelector(".footer")
  const todoCounterElement = document.querySelector(".todo-count strong")
  const refreshFooter = () => {
    if (todoListElement.children.length === 0) {
      footerElement.style.display = "none"
    } else {
      footerElement.style.display = ""
    }

    let todoCounter = 0
    for (const todoListItem of todoListElement.children) {
      if (!todoListItem.classList.contains("completed")) {
        todoCounter++
      }
    }
    todoCounterElement.innerText = todoCounter
  }
  refreshFooter()

  //checkbox setzen und text durchstreichen
  const addCallbacksForLi = (liElement) => {
    const checkboxElement = liElement.querySelector(".toggle")
    const destroyButtonElement = liElement.querySelector(".destroy")
    checkboxElement.addEventListener("change", () => {
      if (checkboxElement.checked) {
        liElement.classList.add("completed")
      } else {
        liElement.classList.remove("completed")
      }
      refreshFooter()
    })
    //x button löscht die ganze liste
    destroyButtonElement.addEventListener("click", () => {
      liElement.remove()

      refreshFooter()
    })
  }

  //mit entertaste wird das element bestätige
  newToDoElement.addEventListener("keypress", (event) => {

    //prüfen ob die entertaste gedrückt wurde und ob es einen wert hat  
    if (event.which === KEY_ENTER && newToDoElement.value !== "") {

      //es wird eine neue html strucktur angelgt (button-label-checkbox-div-li)
      const newButtonElement = document.createElement("button")
      const newLabelElement = document.createElement("label")
      const newInputCheckbox = document.createElement("input")
      const newDivElement = document.createElement("div")
      const newLiElement = document.createElement("li")

      //button_checkbox_div bekommen eine zusätzliche klasse
      newButtonElement.classList.add("destroy")
      newInputCheckbox.classList.add("toggle")
      newDivElement.classList.add("view")

      //aktueller inhalt des texteingabefeldes hineinsetzten
      newLabelElement.appendChild(
        document.createTextNode(newToDoElement.value))

      //die typeeigenschaft wird auf checkbox gesetzt
      newInputCheckbox.type = "checkbox"

      //drei elemente werden ddem div hinzugefügt
      newDivElement.appendChild(newInputCheckbox)
      newDivElement.appendChild(newLabelElement)
      newDivElement.appendChild(newButtonElement)

      //das div wird dem li element hinzugefügt
      newLiElement.appendChild(newDivElement)

      //callback aufrufe der neuen liste
      addCallbacksForLi(newLiElement)

      //das listelement wird der ulListe oben hinzugefügt
      todoListElement.prepend(newLiElement)

      //eingabefeld value wird gelöscht
      newToDoElement.value = ""

      refreshFooter()
    }
  })
})