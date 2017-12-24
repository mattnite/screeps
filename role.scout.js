var roleScout = {

    run: function(creep) {
	creep.moveTo( new RoomPosition(25, 25, creep.memory.room));
    }
};

module.exports = roleScout;
