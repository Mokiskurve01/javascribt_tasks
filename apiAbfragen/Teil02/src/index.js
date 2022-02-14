"use strict"
/*
const productApi = require("./api/product")
const search = productApi.serch
const info = productApi.info
*/

const {
  search,
  info
} = require("./api/product")

search("Apple").then((res) => console.log(res))

info(1103344).then((p) => console.log(p))