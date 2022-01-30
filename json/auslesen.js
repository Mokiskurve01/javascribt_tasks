"use strict"

const data = [{
    firstname: "Alex",
    age: 42,
    enrolled: true
  },
  {
    firstname: "Andrea",
    age: 38,
    enrolled: false
  }
]
const dataAsJson = JSON.stringify(data)
console.log("dataAsJson: ", dataAsJson)
console.log("typeof dataAsJso: ", typeof dataAsJson)

//Achtung: Anti-Pattern fs.writeFileSync() ist lansam

const fs = require("fs")
fs.writeFileSync("ausgeben.json", dataAsJson)