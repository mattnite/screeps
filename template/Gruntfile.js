module.exports = function(grunt) {

    grunt.loadNpmTasks('grunt-screeps');

    grunt.initConfig({
        screeps: {
            options: {
                email: '',
                password: '',
                branch: 'deploy',
                ptr: false
            },
            dist: {
                src: ['dist/*.js', 'dist/*.wasm']
            }
        }
    });
}
