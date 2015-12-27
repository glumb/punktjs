module.exports = function (grunt) {

    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        babel: {
            options: {
                sourceMap: true,
                presets:   ['es2015']
            },
            dist:    {
                files: [{
                    expand: true,
                    dest:   'lib',
                    cwd:    'src/',
                    src:    '*'
                }]
            }
        },
        watch: {
            scripts: {
                files:   'src/*.js',
                tasks:   ['default'],
                options: {
                    debounceDelay: 250
                }
            }
        }
    });


    grunt.registerTask('default', ['babel']);
    grunt.registerTask('watch', ['watch']);
};
