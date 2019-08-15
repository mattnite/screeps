// A* pathfinding
//
// Author: Matthew Knight
// File Name: a.hpp
// Date: 2019-06-26

#pragma once

#include "agent-factory.hpp"
#include "frame.hpp"

#include <iostream>
#include <array>
#include <vector>
#include <set>

namespace {
	std::size_t distance(Position const& begin, Position const& end) {
		std::size_t dy = std::max(begin.first, end.first) - std::min(begin.first, end.first);
		std::size_t dx = std::max(begin.second, end.second) - std::min(begin.second, end.second);
		std::size_t diff = std::max(dy, dx) - std::min(dy, dx);
		return (10 * diff) + (14 * std::min(dy, dx));
	}
}

struct A {
	
	struct Node {
		Node* parent = nullptr; 
		std::vector<Node> children;

		Position pos;
		std::size_t g;
		std::size_t h;
		std::size_t cost;

		Node(Position const& pos, Position const& goal) : pos(pos), g(0), h(distance(pos, goal)), cost(g + h) {}
		Node(Position const& pos, Position const& goal, Node const& last) 
			: pos(pos), g(distance(last.pos, pos)), h(distance(pos, goal)), cost(g + h) {}

		bool operator==(Node const& other) {
			return pos == other.pos;
		}
	};

	template<auto height, auto width>
	void process(Frame<height, width> const& frame, std::vector<Agent> const& agents) {
		std::set<Position> neighbours;
		std::transform(agents.cbegin(), agents.cend(), std::back_inserter(neighbours), [](auto& agent) { return agent.pos; });

		std::set<Position> obstacles = neighbours;
		// expensive doing this copy every single iteration
		for (std::size_t row = 0; row < height; row++)
			for (std::size_t col = 0; col < width; col++)
				if (frame[row][col] == '1')
					obstacles.emplace(row, col);
		
		for (auto& agent : agents) {
			// determine if agent needs a path
			if ((agent.pos != agent.goal && agent.path.empty()) || std::any_of(agents.cbegin(), agents.cend(), [&](auto& other) {
				return agent != other &&
					(std::abs(agent.pos.first - other.pos.first) <= 1 && std::abs(agent.pos.second - other.pos.second) <= 1);
			})) {
				// need to get as close as possible if there is no path
				auto nodeCompare = [](auto& lhs, auto& rhs) { return lhs.cost < rhs.cost; };
				std::set<Node> visited(nodeCompare);
				std::set<Node> prospect(nodeCompare);
				visited.emplace(agent.pos, agent.goal);
				
				while (std::find(visited.cbegin(), visited.cend(), agent.goal) == visited.cend()) {

				}
				
				// unpackage
			}
		}
	}
};
