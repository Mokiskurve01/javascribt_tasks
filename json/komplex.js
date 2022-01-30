"use strict"

// https://github.com/r-spacex/SpaceX-API
// rockets.json: https://api.spacexdata.com/v3/rockets

const fs = require("fs")
const rocketAsString = fs.readFileSync("spacex/rockets.json", {
  encoding: "utf-8"
})

const rockets = JSON.parse(rocketAsString)


for (const rocket of rockets) {
  console.log(rocket["rocket_name"])
}