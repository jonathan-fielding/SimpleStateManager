module.exports = function (grunt) {
    // Project configuration.

    require('load-grunt-tasks')(grunt);

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

            all: 'src/ssm.js'
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
        babel: {
            options: {
                sourceMap: true
            },
            dist: {
                files: {
                    'src/ssm.js': 'src/ssm.es6'
                }
            }
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

    // Default task(s)
    grunt.registerTask('default', ['uglify']);
    grunt.registerTask('bugfix', ['qunit', 'bumpup', 'compile-handlebars', 'uglify']);
    grunt.registerTask('minor', ['qunit', 'bumpup:minor', 'compile-handlebars', 'uglify']);
    grunt.registerTask('major', ['qunit', 'bumpup:major', 'compile-handlebars', 'uglify']);

    // Travis CI tests
    grunt.registerTask('travis', ['qunit', 'jshint']);
};