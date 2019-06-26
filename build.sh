#!/bin/bash

em++ --bind -s MODULARIZE=1 -Os iterate.cpp -o build/iterate.js
mv build/iterate.js dist/iterate_mod.js
mv build/iterate.wasm dist
grunt screeps
