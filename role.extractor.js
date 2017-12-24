var highSource = function(sources)
{
    var high = sources[0];

    for (i in sources)
	if (sources[i].energy > high.energy)
	    high = sources[i];

    return high;
}

var roleExtractor = {

    /** @param {Creep} creep **/
    run: function(creep) {
	// find and grab energy from biggest energy	
        if(creep.carry.energy < creep.carryCapacity) 
	{
            var source = highSource(creep.room.find(FIND_SOURCES));
            if(creep.harvest(source) == ERR_NOT_IN_RANGE)
                creep.moveTo(source);
        }
	else if (// containers are under construction)
	{

	}
	else 
	    // if all built, move to lowest container
	    // transfer energy
    }
};

module.exports = roleExtractor;


/*
var roleBuilder = {

    run: function(creep) {

        if(creep.memory.building && creep.carry.energy == 0) {
            creep.memory.building = false;
            creep.say('🔄 harvest');
        }
        if(!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
            creep.memory.building = true;
            creep.say('🚧 build');
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
            var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }
    }
};

module.exports = roleBuilder;

*/
