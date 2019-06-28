// Pathfinding playing around
//
// Author: Matthew Knight
// File Name: main.cpp
// Date: 2019-06-26

#include "a.hpp"
#include "display.hpp"
#include "agent-factory.hpp"

#include <ncurses.h>
#include <unistd.h>

#include <algorithm>
#include <filesystem>
#include <fstream>
#include <iostream>

const std::size_t length = 50;

int usage() {
    std::cerr << "pathfind -a NUM -t TERRAIN" << std::endl;
    return 1;
}

int main(int argc, char* argv[]) {
    Frame<length, length> terrain;
	std::vector<Agent> agents;

    try {
        std::filesystem::path terrainPath;
		std::size_t agentNum;
        
        // parse arguments
        std::vector<std::string> arguments(argv + 1, argv + argc);
		auto it = std::find(arguments.cbegin(), arguments.cend(), "-t");
        if (it == arguments.cend() || std::next(it) == arguments.cend()) {
            std::cerr << "Need to specify terrain file" << std::endl;
            return usage();
        }

        terrainPath = *++it;

        if (!std::filesystem::exists(terrainPath)) {
            std::cerr << "Terrain file does not exist" << std::endl;
            return 1;
        }

        try {
            // open terrain and parse file
            std::vector<char> buf(length + 1);
            std::ifstream terrainFile(terrainPath);
            for (std::size_t row = 0; row < length; row++) {
                terrainFile.getline(buf.data(), buf.size());
                if (terrainFile.gcount() != length + 1)
                    throw std::runtime_error("Invalid terrain dimensions");

                for (std::size_t col = 0; col < length; col++)
                    terrain[row][col] = buf[col];
            }
        } catch (std::exception const& e) {
            std::cerr << "Error parsing terrain file:" << std::endl;
            std::cerr << e.what() << std::endl;
            return 1;
        }

       	it = std::find(arguments.cbegin(), arguments.cend(), "-a");
        if (it == arguments.cend() || std::next(it) == arguments.cend()) {
            std::cerr << "Need to specify number of agents" << std::endl;
            return usage();
        }

		std::size_t num = std::stoul(*++it);
        if (agentNum < 1) {
            std::cerr << "Need to be one or more agents" << std::endl;
            return 1;
        }

		AgentFactory::createAgents(terrain, num, agents);
    } catch (std::exception const& e) {
        std::cerr << "Error parsing arguments:" << std::endl;
        std::cerr << e.what() << std::endl;
        return usage();
    }

    // initialize ncurses
    Display<length, length> display;

    Frame<length, length> buf;
    std::copy(terrain.begin(), terrain.end(), buf.begin());
    buf[5][8] = 'A';

    display.update(buf);
    getch();
}
