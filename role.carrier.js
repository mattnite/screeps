var roleCarrier = {
    run: function(creep) {	
	if (creep.carry.energy == 0) {
	    creep.memory.empty = true;

	}
	else if (creep.carry.energy == creep.carryCapacity) {
	    creep.memory.empty = false;
	}
	
	if (creep.memory.empty) {
	    // go grab energy from highest container


	}
	else {
	    // drop off at closest storage
	    creep.pos.findClosestByPath(Game.structures, {algorithm: "astar",
		filter: {structureType == STRUCTURE_STORAGE }
	    });
	}
    }
};

module.exports = roleCarrier;

