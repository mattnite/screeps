var scout = function() {
    for (const i in Game.rooms) {
	var room = Game.rooms[i];
	var frontier = [];

	// if room is owned add exits
	if (room.controller.my) {
	    let exits = Game.map.describeExits(room.name);
	    for (const j in exits) {
		frontier.push(exits[j]);	
	    }
	}
    }
    
    for (const i in frontier) {
	queue = Memory.spawnQueue;
	queue.push({body: [MOVE], memory: {role: 'scout', path: 0, room: frontier[i]}});
	Memory.spawnQueue = queue;
    }
};

module.exports = scout;
