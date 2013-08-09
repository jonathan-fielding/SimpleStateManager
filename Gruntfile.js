module.exports = function (grunt) {
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                src: 'src/ssm.js',
                dest: 'dist/ssm.min.js'
            }
        },

        qunit: {
            all: ['test/**/*.html']
        },

        watch: {
            build: {
                files: ['src/ssm.js'],
                tasks: ['uglify']
            }
        }
    });


    // Required task(s)
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-qunit');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    // Default task(s)
    grunt.registerTask('default', ['uglify']);
};