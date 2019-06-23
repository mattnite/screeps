// C/C++ interface to be called by scripts
//
// Author: Matthew Knight
// File Name: iterate.hpp
// Date: 2019-06-22

#include <emscripten.h>
#include <emscripten/val.h>
#include <emscripten/bind.h>

#include <iostream>

void iterate() {
    std::cout << "hello world" << std::endl;
}

EMSCRIPTEN_BINDINGS(iterate) {
    emscripten::function("iterate", &iterate);
}
