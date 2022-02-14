"use strict"

const axios = require("axios")

module.exports.search = function search(term) {
  return axios.get("https://api.nal.usda.gov/fdc/v1/foods/search", {
      params: {
        api_key: "0kbsveGhFq8QtZ2w22vo5OngwaWBhhUl9FgVOVrt",
        query: term
      }
    })
    .then((response) => response.data['foods'])
}


module.exports.info = function info(fdcId) {
  return axios.get("https://api.nal.usda.gov/fdc/v1/foods/" + fdcId, {
      params: {
        api_Key: "0kbsveGhFq8QtZ2w22vo5OngwaWBhhUl9FgVOVrt"
      }
    })
    .then((response) => response.data)
}