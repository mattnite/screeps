// Main module for Screeps AI
//
// Author: Matthew Knight
// File Name: main.js
// Date: 2018-03-10

// This will return an ArrayBuffer with `addTwo.wasm` binary contents
const bytecode = require('addTwo');

const wasmModule = new WebAssembly.Module(bytecode);

const imports = {};

// Some predefined environment for Emscripten. See here:
// https://github.com/WebAssembly/tool-conventions/blob/master/DynamicLinking.md
imports.env = {
    memoryBase: 0,
    tableBase: 0,
    memory: new WebAssembly.Memory({ initial: 256 }),
    table: new WebAssembly.Table({ initial: 0, element: 'anyfunc' })    
};

const wasmInstance = new WebAssembly.Instance(wasmModule, imports);

console.log(wasmInstance.exports._addTwo(2,3));
