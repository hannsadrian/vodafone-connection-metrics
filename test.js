'use strict'

const {ok} = require("assert")
const fetchMetrics = require(".")

fetchMetrics().catch(err => {
  console.log(`caught: ${err}\n`)
}).then(res => {
  ok(typeof(res) === "object", "response data is not instance of an object")
})
