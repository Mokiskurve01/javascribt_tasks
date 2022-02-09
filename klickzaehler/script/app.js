"use strict"

document.addEventListener("DOMContentLoaded", () => {

  const counterNumber = document.getElementById("counter-number")
  const buttonKlick = document.getElementById("button-klick")
  const buttonReset = document.getElementById("button-reset")

  let currentCounter = parseInt(counterNumber.innerText, 10)

  buttonKlick.addEventListener("click", () => {
    currentCounter++
    counterNumber.innerText = currentCounter
  })

  buttonReset.addEventListener("click", () => {
    counterNumber.innerText = 0
  })
})