module.exports = function(grunt)
{
    grunt.loadNpmTasks('grunt-screeps');
    grunt.initConfig({
	screeps: {
	    options: {
		email: 'mgk1795@gmail.com',
		password: 'Batman1795',
		branch: 'default',
		ptr: false
	    },
	    dist: {
		src: ['*.js']
	    }
	}
    });
}
