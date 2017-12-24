var build = function()
{
    var constructionDemand = 0;
    var currentBuild = 0;
    
    for (i in Game.constructionSites) {
	var ctor = Game.constructionSites[i];
	constructionDemand += ctor.progressTotal - ctor.progress
    }
    
    // now count how much builder life
    for (i in Game.creeps) {
	if (Game.creeps[i].memory.role == 'builder') {
	    currentBuild += Game.creeps[i].ticksToLive;
	}
    }
    constructionDemand /= Memory.Kbuild;
    console.log("Total demand: " + (constructionDemand/1500));
    var need = Math.ceil((constructionDemand - currentBuild)/1500);
    console.log("Need " + need + " builders");

    if (need > 0) {
	console.log("Build loop:");
	var queue = Memory.spawnQueue;
	for (j = 0; j < need; j++) {
	    console.log("Requesting Builder");
	    queue.push({body: Memory.worker, memory:{ role: 'builder'}});
	}
	Memory.spawnQueue = queue;
    }
    
};

module.exports = build;
