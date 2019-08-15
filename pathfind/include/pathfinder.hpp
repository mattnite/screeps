// Pathfinder wrapper
//
// Author: Matthew Knight
// File Name: pathfinder.hpp
// Date: 2019-06-28

#pragma once

#include "agent-factory.hpp"

template <typename Algorithm>
struct Pathfinder {
	template <typename FrameType>
	void process(FrameType const& frame, std::vector<Agent> const& agents) {
		if constexpr (!std::is_same_v<Algorithm, void>) {
			typename Algorithm::process(frame, agents);
		}
	}
};
