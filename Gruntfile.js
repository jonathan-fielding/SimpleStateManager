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
        copy: {
          main: {
            files: [
              // includes files within path
              {expand: true, flatten: true, src: ['docs/bower_components/jquery/jquery.min.js'], dest: 'docs/js/vendor', filter: 'isFile'},
              {expand: true, flatten: true, src: ['docs/bower_components/sass-bootstrap/js/bootstrap-scrollspy.js'], dest: 'docs/js/vendor', filter: 'isFile'},
              {expand: true, flatten: true, src: ['docs/bower_components/sass-bootstrap/js/bootstrap-collapse.js'], dest: 'docs/js/vendor', filter: 'isFile'},
              {expand: true, flatten: true, src: ['docs/bower_components/modernizr/modernizr.js'], dest: 'docs/js/vendor', filter: 'isFile'},
              {expand: true, flatten: true, src: ['docs/bower_components/respond/respond.min.js'], dest: 'docs/js/vendor', filter: 'isFile'}
            ]
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
                    sassDir: 'docs/sass',
                    cssDir: 'docs/css',
                    imagesDir: 'docs/images',
                    environment: 'development',
                    httpGeneratedImagesPath: 'docs/images'
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
            home: {
                template: 'docs/templates/homepage.handlebars',
                templateData: {
                    package: grunt.file.readJSON('package.json'),
                    versions: grunt.file.readJSON('releases.json')
                },
                output: 'index.html'
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
    grunt.registerTask('bugfix', ['qunit', 'jshint', 'bumpup', 'compile-handlebars', 'uglify', 'copy']);
    grunt.registerTask('minor', ['qunit', 'jshint', 'bumpup:minor', 'compile-handlebars', 'uglify', 'copy']);
    grunt.registerTask('major', ['qunit', 'jshint', 'bumpup:major', 'compile-handlebars', 'uglify', 'copy']);

    // Travis CI tests
    grunt.registerTask('travis', ['qunit', 'jshint']);
};