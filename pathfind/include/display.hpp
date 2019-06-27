// C++ wrapper for ncurses stdscr
//
// Author: Matthew Knight
// File Name: window.hpp
// Date: 2019-06-26

#pragma once

#include <ncurses.h>

#include <array>
#include <iostream>

int charToColorPair(char elem) {
    switch (elem) {
        case '0': return 1;
        case '1': return 2;
        case '2': return 3;
        case '3': return 4;
    }

    return 0;
}

template <auto height, auto width>
using Frame = std::array<std::array<char, height>, width>;

template <auto height, auto width>
class Display {
    void colorize(char elem) {
        attron(COLOR_PAIR(charToColorPair(elem)));
        addch(elem);
        attroff(COLOR_PAIR(charToColorPair(elem)));
    }

  public:
    Display() {
        initscr();
        start_color();
        int cols, rows;

        getmaxyx(stdscr, rows, cols);
        if (height > rows || width > cols)
            throw std::runtime_error("Screen dimensions are too small");

        init_pair(charToColorPair('0'), COLOR_BLACK, COLOR_BLACK);
        init_pair(charToColorPair('1'), COLOR_WHITE, COLOR_WHITE);
        init_pair(charToColorPair('2'), COLOR_GREEN, COLOR_GREEN);
        init_pair(charToColorPair('3'), COLOR_YELLOW, COLOR_YELLOW);
    }

    void update(Frame<height, width> const& frame) {
        move(0, 0);

        for (auto& row : frame) {
            for (auto& elem : row)
                colorize(elem);

            addch('\n');
        }

        refresh(); }

    ~Display() { endwin(); }
};
