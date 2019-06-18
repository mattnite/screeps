module.exports = function(grunt) {

    grunt.loadNpmTasks('grunt-screeps');

    grunt.initConfig({
        screeps: {
            options: {
                email: '',
                password: '',
                branch: 'default',
                ptr: false
            },
            dist: {
                src: ['dist/*.js', 'dist/*.wasm']
            }
        }
    });
}
