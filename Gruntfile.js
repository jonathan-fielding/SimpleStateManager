module.exports = function (grunt) {
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> | license: MIT | version: <%= pkg.version %> | build date: <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                src: 'src/ssm.js',
                dest: 'dist/ssm.min.js'
            }
        },

        qunit: {
            all: ['test/**/*.html']
        },

        compass: {
            dev: {
                options: {
                    sassDir: 'docs/sass',
                    cssDir: 'docs/css',
                    imagesDir: 'docs/images',
                    environment: 'development',
                    httpGeneratedImagesPath: '/images'
                }
            }
        },

        watch: {
            build: {
                files: ['src/ssm.js'],
                tasks: ['uglify, compass:dev']
            },
            compass: {
                files: ['docs/sass/{,*/}*.{scss,sass}'],
                tasks: ['compass']
            },
        }
    });


    // Required task(s)
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-qunit');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-compass');

    // Default task(s)
    grunt.registerTask('default', ['uglify']);

    // Travis CI tests
    grunt.registerTask('travis', ['qunit']);
};