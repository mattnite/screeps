// Pathfinding playing around
//
// Author: Matthew Knight
// File Name: main.cpp
// Date: 2019-06-26

#include "a.hpp"
#include "display.hpp"
#include "agent-factory.hpp"
#include "pathfinder.hpp"

#include <ncurses.h>
#include <unistd.h>

#include <algorithm>
#include <chrono>
#include <filesystem>
#include <fstream>
#include <iostream>
#include <thread>

const std::size_t length = 50;

int usage() {
    std::cerr << "pathfind -a NUM -t TERRAIN" << std::endl;
    return 1;
}

int main(int argc, char* argv[]) {
    Frame<length, length> terrain;
	std::vector<Agent> agents;
	std::chrono::milliseconds tickPeriod(1000);

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
	Pathfinder<void> pathfinder;

	std::size_t collisions = 0;

	for (std::size_t i = 0; i < 100; i++) {
		Frame<length, length> frame;
		std::copy(terrain.begin(), terrain.end(), frame.begin());
		for (auto& agent : agents) {
			frame[agent.goal.first][agent.goal.second] = agent.name - 32;
			frame[agent.pos.first][agent.pos.second] = agent.name;
		}

		display.update(frame);
		// run algo	
		pathfinder.process(terrain, agents);
		std::this_thread::sleep_for(tickPeriod);
		
		// move everyone around
		for (auto& agent : agents) {
			if (!agent.path.empty()) {
				if (std::none_of(agents.cbegin(), agents.cend(), [&](auto& other) { return other.pos == agent.path.front(); })) {
					agent.pos = agent.path.front();
					agent.path.pop();
				} else {
					collisions++;
				}
			}
		}
	}

	std::cout << "collisions: " << collisions << std::endl;
}
