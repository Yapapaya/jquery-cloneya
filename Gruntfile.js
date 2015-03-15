module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            build: {
                src: 'dist/jquery-<%= pkg.name %>.js',
                dest: 'dist/jquery-<%= pkg.name %>.min.js'
            }
        },
        qunit: {
            src: ['tests/jquery-<%= pkg.name %>.html']
        },
        jshint: {
            files: ['dist/jquery-<%= pkg.name %>.js'],
            options: {
                globals: {
                    jQuery: true
                },
                "bitwise": true,
                "curly": true,
                "eqeqeq": true,
                "forin": true,
                "latedef": true,
                "maxparams": 3,
                "noarg": true,
                "nonew": true,
                "shadow": true,
                "strict": true,
                "undef": true,
                "unused": true,
                "browser": true,
            }


        },
        watch: {
            files: ['<%= jshint.files %>'],
            tasks: ['jshint']
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-qunit');


    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('travis', 'qunit:src');



    grunt.registerTask('default', ['jshint', 'travis', 'uglify']);


};