var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
	if (creep.carry.energy == 0) {
	    creep.memory.empty = true;

	}
	else if (creep.carry.energy == creep.carryCapacity) {
	    creep.memory.empty = false;
	}


        if(creep.memory.empty) {

	    // If container empty find closest source
	    if (creep.room.storage.store[RESOURCE_ENERGY] == 0) {
		var source = creep.room.find(FIND_SOURCES);
		if(creep.harvest(source[0]) == ERR_NOT_IN_RANGE) {
		    creep.moveTo(source[0], {visualizePathStyle: {stroke: '#ffaa00'}});
		}
	    }
	    else {
		if (creep.withdraw(creep.room.storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
		    creep.moveTo(creep.room.storage);
		}
	    }
        }
        else {
	    var targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_CONTAINER ||	
                        structure.structureType == STRUCTURE_SPAWN ||
			structure.structureType == STRUCTURE_EXTENSION ||
                        structure.structureType == STRUCTURE_TOWER) && structure.energy < structure.energyCapacity;
                }
            });
            if(targets.length > 0) {
		var closest = targets[0];
		var lowwest = PathFinder.search(creep.pos, {pos: targets[0].pos, range: 1}).cost;
		for (const i in targets) {
		    var newCost = PathFinder.search(creep.pos, {pos: targets[i].pos, range: 1}).cost;

		    if (newCost < lowwest) {
			lowwest = newCost;
			closest = targets[i];
		    }
		    
		}

                if(creep.transfer(closest, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(closest, {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
        }
    }
};

module.exports = roleHarvester;
