// Agent Factory
//
// Author: Matthew Knight
// File Name: agent-factory.hpp
// Date: 2019-06-27

#pragma once

#include "a.hpp"

#include <vector>
#include <tuple>
#include <random>

namespace {
	auto mersenne = std::mt19937();
}

using Position = std::pair<std::size_t, std::size_t>;
using Path = std::vector<Position>;

struct Agent {
	char name;
	int fatigue = 0;;
	Position pos;
	Position goal;
	Path path;
};

namespace AgentFactory {
	Position randomPosition(std::size_t height, std::size_t width) {
		std::uniform_int_distribution<std::size_t> heightDist(0, height);
		std::uniform_int_distribution<std::size_t> widthDist(0, width);
		
		return make_pair(heightDist(mersenne), widthDist(mersenne));
	}

	template <auto height, auto width>
	void createAgents(Frame<height, width> const& terrain, std::size_t num, std::vector<Agent>& agents) {
		if (num > 26)
			throw std::runtime_error("too many agents, ran out of letters");

		// check to make sure there are enough spots to land the agents
		std::size_t obstacleCount = std::count(terrain.data(), terrain.data() + (width * height), '1');

		agents.clear();
		char nextLetter = 'a';
		std::generate_n(std::back_inserter(agents), num, [&]() {
			Position begin;
			Position end;
			do {
				begin = randomPosition(height, width);
			} while(
				terrain[pos.first][pos.second] != '1' && 
				
			);
			
			do {
				end = randomPosition(height, width);
			} while(
				terrain[pos.first][pos.second] != '1' && 
			);
			
		});
	}
}
