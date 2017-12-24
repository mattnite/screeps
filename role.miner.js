var roleMiner = {

    /** @param {Creep} creep **/
    run: function(creep) {
	
	// switch state if completely full or empty
	if (creep.carry.energy == 0) {
		creep.memory.empty = true;
		var sources = creep.room.find(FIND_SOURCES);
		var highest = sources[0].energy;
		var src = sources[0].id;
		for (i in sources) {
		    if (sources[i].energy > highest) {
			highest = sources[i].energy;
			src = sources[0].id
		    }
		    creep.memory.source = src;
		}
	}
	else if (creep.carry.energy == creep.carryCapacity ){
		creep.memory.empty = false;
	}

	if (creep.memory.empty) {
	    if(creep.harvest(Game.getObjectById(creep.memory.source), RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
		creep.moveTo(Game.getObjectById(creep.memory.source));
	    }
	}
	else {
	    if(creep.transfer(creep.room.storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
		creep.moveTo(creep.room.storage);
	    }
	}
    }
};

module.exports = roleMiner;

