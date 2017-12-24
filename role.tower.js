var roleTower = {
    run: function(tower) {
	if (tower.energy > 0) {
	    var enemies = tower.room.find(FIND_HOSTILE_CREEPS)
	    if (enemies.length >0) {
		tower.attack(enemies[0]);
	    }
	    var fixables = tower.room.find(FIND_STRUCTURES, {
		filter: (struct) => {
		    (struct.structureType == STRUCTURE_CONTAINER ||
		    struct.structureType == STRUCTURE_ROAD)  &&
		    struct.hits < struct.hitsMax} })
	    if (fixables.length > 0) {
		tower.repair(fixables[0]);
	    }
	}
    }
};

module.exports = roleTower
