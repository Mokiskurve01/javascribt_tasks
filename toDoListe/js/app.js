// 1.Strikter Modus für komplettes Skript
'use strict';
// 2.keyCode der Entertaste
const KEY_ENTER = 13
// 3.HTML-Dokument vollständig geladen 
document.addEventListener("DOMContentLoaded", () => {
  // 4.abfrage des elements des eingabefeldes(."new-todo")
  const newTodoElement = document.querySelector(".new-todo")
  // 5.die gesamte ul list (."todo-list")
  const todoListElement = document.querySelector(".todo-list")
  // 6.footer bereich(."footer")
  const footerElement = document.querySelector(".footer")
  // 7.item anzahl(".todo-count strong")
  const todoCountElement = document.querySelector(".todo-count strong")
  // 8.alle listen löschen(".clear-completed")
  const clearCompletedElement = document.querySelector(".clear-completed")
  // 9.footerbereich display none wenn .length === 0
  const refreshFooter = () => {
    if (todoListElement.children.length === 0) {
      footerElement.style.display = "none"
    } else {
      footerElement.style.display = ""
    }
    // 10.zählen der todocounter("li:not(.completed)")
    let todoCounter = todoListElement.querySelectorAll("li:not(.completed)").length
    // 11.übertragen des counters
    todoCountElement.innerText = todoCounter
    // 12.display none wenn ("li.completed").lenght === 0
    let completedCounter = todoListElement.querySelectorAll("li.completed").length
    if (completedCounter === 0) {
      clearCompletedElement.style.display = "none"
    } else {
      clearCompletedElement.style.display = ""
    }
  }
  // 13.footer aktualiesieren
  refreshFooter()
  // 14.checkbox setzen und text durchstreichen 
  const addCallbacksForLi = (liElement) => {
    const checkboxElement = liElement.querySelector(".toggle")
    const destroyButtonElement = liElement.querySelector(".destroy")
    // 15.bei completed text durchstreichen
    checkboxElement.addEventListener("change", () => {
      if (checkboxElement.checked) {
        liElement.classList.add("completed")
      } else {
        liElement.classList.remove("completed")
      }
      // 16.footer aktualiesieren
      refreshFooter()
    })
    // 17.x löscht die ganze liste
    destroyButtonElement.addEventListener("click", () => {
      liElement.remove()
      // 18.footer aktualiesieren
      refreshFooter()
    })
  }
  // 19.mit entertaste wird das element bestätige
  newTodoElement.addEventListener("keypress", (event) => {
    // 20.prüfen ob die entertaste gedrückt wurde und ob es einen wert hat
    if (event.which === KEY_ENTER && newTodoElement.value !== "") {
      // 21.es wird eine neue html strucktur angelgt (button-label-checkbox-div-li)
      const newButtonElement = document.createElement("button")
      const newLabelElement = document.createElement("label")
      const newInputCheckbox = document.createElement("input")
      const newDivElement = document.createElement("div")
      const newLiElement = document.createElement("li")
      // 22.button_checkbox_div bekommen eine zusätzliche klasse
      newButtonElement.classList.add("destroy")
      newInputCheckbox.classList.add("toggle")
      newDivElement.classList.add("view")
      // 23.aktueller inhalt des texteingabefeldes hineinsetzten
      newLabelElement.appendChild(
        document.createTextNode(newTodoElement.value)
      )
      // 24.die typeeigenschaft wird auf checkbox gesetzt
      newInputCheckbox.type = "checkbox"
      // 25.drei elemente werden ddem div hinzugefügt
      newDivElement.appendChild(newInputCheckbox)
      newDivElement.appendChild(newLabelElement)
      newDivElement.appendChild(newButtonElement)
      // 26.das div wird dem li element hinzugefügt
      newLiElement.appendChild(newDivElement)
      // 27.callback aufrufe der neuen liste
      addCallbacksForLi(newLiElement)
      // 28.das listelement wird der ulListe oben hinzugefügt
      todoListElement.prepend(newLiElement)
      // 29.eingabefeld value wird gelöscht
      newTodoElement.value = ""
      // 30.anzahl item aktualisieren
      refreshFooter()
    }
  })
  // 31.alle completedelemente löschen
  clearCompletedElement.addEventListener("click", (event) => {
    const completedLiElements = todoListElement.querySelectorAll("li.completed")
    for (const completedLiElement of completedLiElements) {
      completedLiElement.remove()
    }
    // 32.anzahl item aktualisieren
    refreshFooter()
  })
});