var roleUpgrader = {

    /** @param {Creep} creep **/
    run: function(creep) {

        if(creep.memory.upgrading && creep.carry.energy == 0) {
            creep.memory.upgrading = false;
        }
        if(!creep.memory.upgrading && creep.carry.energy == creep.carryCapacity) {
            creep.memory.upgrading = true;
        }

        if(creep.memory.upgrading) {
            if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller);
            }
        }
        else {
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
    }
};

module.exports = roleUpgrader;
