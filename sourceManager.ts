// Screeps source manager

// Author: Matthew Knight
// FileName: sourceManager.ts
// Date: 2017-08-22

class sourceManager
{
    sourceID: string;
    miners: Array<string>;
    creepNum: number;
    energyCollected: number;
    ticksWaiting: number;
    minerBody: Array<number>;
    
    // ctor
    constructor(id: string)
    {
	this.sourceID = id;
	this.miners = [];
	this.creepNum = 0;
    }

    // send spawn requests
    respawnMiners()
    {
	// Remove any dead miners from list
	

	// count how many we need
	let need = this.creepNum - this.miners.length;

	// send spawn requests
	if (need > 0) {
	    for (let i = 0; i < need; i++) {
		Memory.spawnQueue.push({body: this.minerBody, memory: {role: 'miner', source: this.sourceID, ticksWaited: 0, energyCollected: 0}})
	    }
	}
    }
    
    tuneBody()
    {

    }

    // Evaluation
    evaluate()
    {
	// Add any new miners
	for (const i in Game.creeps) {
	    if (Game.creeps[i].memory.source == this.sourceID) {
		this.miners.push(Game.creeps[i].id);
	    }
	}
	
	let source = Game.getObjectById(this.sourceID);
	ticksWaited: number = 0;
	energyCollected: number = 0;
	
	for (const i in this.miners)
	{
	    ticksWaited += this.miners[i].memory.ticksWaited;
	    energyCollected += this.miners[i].memory.energyCollected;
	    
	    this.miners[i].memory.ticksWaited = 0;
	    this.miners[i].memory.energyCollected = 0;
	}

	let creepLifeWait = ticksWaited/(numCreeps*1500);
	let extraction = (energyCollected*300)/(source.energyCapacity * 750);

	if (creepLifeWait < 0.1 && extraction < 0.9) {
	    this.creepNum++;
	}
	else if (creepLifeWait > 0.1 && extraction > 0.9) {
	    this.creepNum--;
	}
    }
}
