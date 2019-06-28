// A* pathfinding
//
// Author: Matthew Knight
// File Name: a.hpp
// Date: 2019-06-26

#pragma once

#include <array>

template <auto height, auto width>
using Frame = std::array<std::array<char, width>, height>;
