module.exports = function (grunt) {
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> | license: MIT | version: <%= pkg.version %> | build date: <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                files: {
                    'dist/ssm.min.js': ['src/ssm.js']
                }
            }
        },

        qunit: {
            all: ['test/**/*.html']
        },

        jshint: {
            all: ['src/ssm.js']
        },

        compass: {
            dev: {
                options: {
                    sassDir: 'docs/examples/sass',
                    cssDir: 'docs/examples/css',
                    environment: 'development'
                }
            }
        },

        watch: {
            build: {
                files: ['src/ssm.js'],
                tasks: ['uglify']
            },
            compass: {
                files: ['docs/sass/{,*/}*.{scss,sass}'],
                tasks: ['compass:dev']
            },
            handlebars: {
                files: ['docs/templates/{,*/}*.{handlebars}'],
                tasks: ['compile-handlebars']
            }
        },

        bumpup: {
            options: {
                updateProps: {
                    pkg: 'package.json'
                }
            },
            setters: {
                // Custom setters go here.
            },
            files: ['package.json', 'bower.json']
        },

        'compile-handlebars': {
            readme: {
                template: 'docs/templates/readme.handlebars',
                templateData: {
                    package: grunt.file.readJSON('package.json'),
                    versions: grunt.file.readJSON('releases.json')
                },
                output: 'README.md'
            }
        }
    });

    // Required task(s)
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-qunit');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-bumpup');
    grunt.loadNpmTasks('grunt-compile-handlebars');

    // Default task(s)
    grunt.registerTask('default', ['uglify', 'copy']);
    grunt.registerTask('bugfix', ['qunit', 'jshint', 'bumpup', 'compile-handlebars', 'uglify']);
    grunt.registerTask('minor', ['qunit', 'jshint', 'bumpup:minor', 'compile-handlebars', 'uglify']);
    grunt.registerTask('major', ['qunit', 'jshint', 'bumpup:major', 'compile-handlebars', 'uglify']);

    // Travis CI tests
    grunt.registerTask('travis', ['qunit', 'jshint']);
};