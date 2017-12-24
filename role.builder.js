var roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {

        if(creep.memory.building && creep.carry.energy == 0) {
            creep.memory.building = false;
        }
        if(!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
            creep.memory.building = true;
        }

        if(creep.memory.building) {
            var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
            if(targets.length) {
                if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
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

module.exports = roleBuilder;
