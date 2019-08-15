#pragma once

#include <array>

template <auto height, auto width>
using Frame = std::array<std::array<char, width>, height>;
