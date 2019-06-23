// Main module for Screeps AI
//
// Author: Matthew Knight
// File Name: main.js
// Date: 2018-03-10

const wasm_loader = require('wasm_loader')
const mod = wasm_loader('iterate_mod', 'iterate')

module.exports.loop = function() {
  mod.iterate()
}
