"use strict"
//eingabe höhe der rechnung
let billString = "1,15"

//eingabe höhe der bezahlung
let payString = "20"

//rückgabegeld berechnen und in string in eine nummer umwandel (auf zwei kommazahlen gerunded)
let change = ((parseFloat(payString.replace(",", "."))) - (parseFloat(billString.replace(",", ".")))).toFixed(2)
console.log("Das Rückgeld beträgt " + change + "€.")

//ausrechnen welche münzen verwende werden und abzug vom rückgabewert
function changeMoney(coin) {
  console.log(" - " + Math.floor(change / coin) + "x " + (coin) + "€")
  change = (change - Math.floor(change / coin) * coin).toFixed(2)
}

//2_1_0,5 münzen
let changeCoin = 2
if (change != 0) {
  for (let index = 3; index > 0; index--) {
    changeMoney(changeCoin)
    changeCoin = changeCoin / 2
    if (change === 0)
      changeCoin = changeCoin * 0.5
  }
} else {
  console.log("Die Rechnung wurde genau bezahlt.")
}

//0.2_0.1_0.05
changeCoin = 0.2
if (change != 0) {
  for (let index = 3; index > 0; index--) {
    changeMoney(changeCoin)
    changeCoin = changeCoin / 2
    if (change === 0)
      changeCoin = changeCoin * 0.5
  }
}
//0.02_0.01
changeCoin = 0.02
if (change != 0) {
  for (let index = 2; index > 0; index--) {
    changeMoney(changeCoin)
    changeCoin = changeCoin / 2
    if (change === 0)
      changeCoin = changeCoin * 0.5
  }
}

console.log("Die offene Rechnung macht " + change + "€.")