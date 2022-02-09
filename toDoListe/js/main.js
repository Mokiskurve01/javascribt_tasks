// Strikter Modus für komplettes Skript
"use strict"
//keyCode der Entertaste
const KEY_ENTER = 13
//HTML-Dokument vollständig geladen 
document.addEventListener("DOMContentLoaded", () => {
  //abfrage des elements des eingabefeldes
  const newToDoElement = document.querySelector(".new-todo")
  //die gesamte ul list
  const toDoListElement = document.querySelector(".todo-list")
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
      //button_checkbox_div (destroy_toggle_view)bekommen eine zusätzliche klasse
      newButtonElement.classList.add("destroy")
      newInputCheckbox.classList.add("toggle")
      newDivElement.classList.add("view")
      //aktueller inhalt des texteingabefeldes hineinsetzten
      newLabelElement.appendChild(
        document.createTextNode(newToDoElement.value)
      )
      //die typeeigenschaft wird auf checkbox gesetzt
      newInputCheckbox.type = "checkbox"
      //drei elemente werden dem div hinzugefügt
      newDivElement.appendChild(newButtonElement)
      newDivElement.appendChild(newLabelElement)
      newDivElement.appendChild(newInputCheckbox)
      //das div wird dem li element hinzugefügt
      newLiElement.appendChild(newDivElement)
      //das listelement wird der ulListe oben hinzugefügt
      toDoListElement.prepend(newLiElement)
      //eingabefeld value wird gelöscht
      newToDoElement.value = ""
    }
  })
})