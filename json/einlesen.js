"use strict"

//Wir lesen die "data.json"-Datei ein.
//
//Achtung: fs.readfileSync() ist i.d.r. ein Anti Pattern und
//         zimlich langsam.

const fs = require("fs")
const data = fs.readFileSync("data.json", {
  encoding: "utf-8"
})
const dataOj = JSON.parse(data)

console.log(dataOj[0])