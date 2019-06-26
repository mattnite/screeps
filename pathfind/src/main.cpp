// Pathfinding playing around
//
// Author: Matthew Knight
// File Name: main.cpp
// Date: 2019-06-26

#include "a.hpp"

#include <cxxopts.hpp>

#include <filesystem>

int main(int argc, char* argv[]) {
    int agentNum;
    std::filesystem::path terrainPath;

    cxxopts::Options options("pathfind", "finds paths");
    options.add_options()
        ("t,terrain", "terrain file to use",
                      cxxopts::value<std::filesystem::path>(&terrainPath))
        ("a,agents", "number of agents to find paths for",
                     cxxopts::value<int>(&agentNum));

    options.parse(argc, argv);
}
