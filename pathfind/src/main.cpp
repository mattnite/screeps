// Pathfinding playing around
//
// Author: Matthew Knight
// File Name: main.cpp
// Date: 2019-06-26

#include "a.hpp"

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
	int opt;
	
	// initialize command line arguments with defaults
	std::size_t agentNum;
	std::array<std::array<char, length>, length> terrain;

	try {
		std::filesystem::path terrainPath;
		
		// parse arguments
		std::vector<std::string> arguments(argv + 1, argv + argc);
		auto it = std::find(arguments.cbegin(), arguments.cend(), "-a");
		if (it == arguments.cend() || std::next(it) == arguments.cend()) {
			std::cerr << "Need to specify number of agents" << std::endl;
			return usage();
		}
		
		agentNum = std::stoi(*++it);
		if (agentNum < 1) {
			std::cerr << "Need to be one or more agents" << std::endl;
			return 1;
		}

		it = std::find(arguments.cbegin(), arguments.cend(), "-t");
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
			for (std::size_t i = 0; i < length; i++) {
				terrainFile.getline(buf.data(), buf.size());
				if (terrainFile.gcount() != length + 1)
					throw std::runtime_error("Invalid terrain dimensions");

				for (std::size_t j = 0; j < length; j++)
					terrain[j][i] = buf[j];
			}
		} catch (std::exception const& e) {
			std::cerr << "Error parsing terrain file:" << std::endl;
			std::cerr << e.what() << std::endl;
			return 1;
		}
	} catch (std::exception const& e) {
		std::cerr << "Error parsing arguments:" << std::endl;
		std::cerr << e.what() << std::endl;
		return usage();
	}

	std::cout << "Successfully parsed arguments" << std::endl;
	std::cout << "Terrain:" << std::endl << std::endl;

	for (auto& row : terrain) {
		for (auto& col : row)
			std::cout << col;

		std::cout << std::endl;
	}
}
