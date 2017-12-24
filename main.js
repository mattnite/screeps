var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleRepairJunkie = require('role.repairJunkie');
var roleMiner = require('role.miner');
var scout = require('scout');
var build = require('build');
var roleNurse = require('role.nurse');
var roleScout = require('role.scout');
var roleTower = require('role.tower');

Memory.miner = [MOVE, MOVE, MOVE, MOVE, WORK, WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY];
Memory.worker = [WORK, WORK, WORK, WORK, CARRY, CARRY, MOVE];

module.exports.loop = function () {
    
    var master = Game.spawns['S1'];
    var queue = Memory.spawnQueue;
    var harvesters = 0;
    var builders = 0;
    var upgraders = 0;
    var repairs = 0;
    var miners = 0;
  
    // flag flipping
    if ((Game.time % 750) == 0) {
	Memory.needToScout = true;
    }
    
    if ((Game.time % 1000) == 0) {
	Memory.needBuild = true;
    }

    // Scout surrounding regions
    if (Memory.needToScout) {
	console.log('scouting...');
	scout();
	Memory.needToScout = false;
    }

    if (Memory.needBuild) {
	build();
	Memory.needBuild = false;
    }
    // Process spawn requests
    if (queue.length > 0) {
	for (const i in Game.spawns) {
	    var spawn = Game.spawns[i];
	    if (spawn.canCreateCreep(queue[0].body) == OK) {
		var newCreep = queue.shift();
		spawn.createCreep(newCreep.body, null, newCreep.memory);
		Memory.spawnQueue = queue;
		break;
	    }
	}
    }

    // Towers
    for (i in Game.rooms) {
	var towers = Game.rooms[i].find(FIND_STRUCTURES, {filter: {structureType: STRUCTURE_TOWER}});
	for(j in towers) {
	    roleTower.run(towers[j]);
	    
	}
    }

    if (Game.rooms['W33S13'].energyAvailable >= 200)
    {
	for (var name in Game.creeps)
	{
	    var creep = Game.creeps[name];
	    switch (creep.memory.role)
	    {
		case 'harvester':
		    harvesters++;
		    break;
		case 'builder':
		    builders++;
		    break;
		case 'upgrader':
		    upgraders++;
		    break;
		case 'repair':
		    repairs++;
		    break;
		case 'miner':
		    miners++;
		    break;
	    }
	    
	}
		
	if (harvesters < 4) {
	    master.createCreep([MOVE,CARRY,WORK], null, {role: 'harvester'});
	}
	else if (repairs < 0) {
	    master.createCreep([MOVE, CARRY, WORK], null, {role: 'repair', looking: true});
	}
	if (Game.rooms['W33S13'].energyAvailable >= 550){
	    if (builders < 0) {
		master.createCreep(Memory.worker, null, {role: 'builder'});
	    }
	    else if (upgraders < 2) {
		master.createCreep(Memory.worker, null, {role: 'upgrader'});
	    }

	    else if (miners < 8) {
		master.createCreep(Memory.worker, null, {role: 'miner'});
	    }

	}
    }


    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester') {
	    roleHarvester.run(creep);
        }
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if(creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
        if(creep.memory.role == 'repair') {
            roleRepairJunkie.run(creep);
        }
	if (creep.memory.role == 'miner') {
	    roleMiner.run(creep);
	}
	if (creep.memory.role == 'scout') {
	    roleScout.run(creep);
	}
	if (creep.memory.role == 'nurse') {
	    roleNurse.run(creep);
	}
    }
}
