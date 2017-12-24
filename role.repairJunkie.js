var roleRepairJunkie = {

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
	    // Look at all my structures in all my rooms
	    var targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => { return (structure.hits < structure.hitsMax)}});
	    
	    if (targets.length > 0) {
		// Get structure that needs repair the most
		var mostDire = targets[0];
		var lowwest = targets[0].hits/targets[0].hitsMax;
		for (const i in targets) {
		    var newLow = targets[i].hits/targets[i].hitsMax;

		    if (newLow < lowwest) {
			lowwest = newLow;
			mostDire = targets[i];
		    }
		    
		}
	    }
	    if(creep.repair(mostDire, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
		creep.moveTo(mostDire, {visualizePathStyle: {stroke: '#27ae60'}});
	    }
        }
    }
};

module.exports = roleRepairJunkie;
