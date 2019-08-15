// Agent Factory
//
// Author: Matthew Knight
// File Name: agent-factory.hpp
// Date: 2019-06-27

#pragma once

#include "a.hpp"
#include "frame.hpp"

#include <vector>
#include <tuple>
#include <random>
#include <algorithm>
#include <queue>

namespace {
	std::random_device randDev;
	std::mt19937 mersenne(randDev());
	std::size_t const numLetters = 26;
}

using Position = std::pair<std::size_t, std::size_t>;
using Path = std::queue<Position>;

struct Agent {
	char name;
	Position pos;
	Position goal;
	int fatigue = 0;
	Path path;
};

namespace AgentFactory {
	Position randomPosition(std::size_t height, std::size_t width) {
		std::uniform_int_distribution<std::size_t> heightDist(0, height);
		std::uniform_int_distribution<std::size_t> widthDist(0, width);
		
		return std::make_pair(heightDist(mersenne), widthDist(mersenne));
	}

	template <auto height, auto width>
	void createAgents(Frame<height, width> const& terrain, std::size_t num, std::vector<Agent>& agents) {
		if (num > numLetters)
			throw std::runtime_error("Too many agents, ran out of letters");

		// check to make sure there are enough spots to land the agents
		std::size_t obstacleCount = std::accumulate(terrain.cbegin(), terrain.cend(), 0, [](auto& acc, auto& row) {
			return acc + std::count(row.cbegin(), row.cend(), '1');
		});

		if ((height * width) - obstacleCount < num)
			throw std::runtime_error("Not enough room for agents");

		agents.clear();
		char nextLetter = 'a';
		std::generate_n(std::back_inserter(agents), num, [&]() -> Agent {
			Position begin;
			Position end;
			do {
				begin = randomPosition(height, width);
			} while(
				terrain[begin.first][begin.second] == '1' &&
				std::none_of(agents.cbegin(), agents.cend(), [&] (auto& agent) { return agent.pos == begin; })
			);
			
			do {
				end = randomPosition(height, width);
			} while(
				terrain[end.first][end.second] == '1' &&
				std::none_of(agents.cbegin(), agents.cend(), [&] (auto& agent) { return agent.goal == end; })
			);

			return { nextLetter++, begin, end };
			
		});
	}
}
