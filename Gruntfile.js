module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            build: {
                src: 'js/main.js',
                dest: 'js/main.min.js'
            }
        },
        imagemin: {
            dynamic: {
                files: [{
                    expand: true,
                    cwd: 'img/',
                    src: ['**/*.{png,jpg,gif}'],
                    dest: 'prod/img/'
                }]
            }
        },
        cssmin: {
            dist: {
                files: {
                    'prod/css/screen.min.css': ['css/tidy.css']
                }
            }
        },
        compass: {
            dist: {
                options: {
                    sassDir: 'sass',
                    cssDir: 'css'
                }
            }
        },
        /*sass: {
            options: {
                sourceMap: false
            },
            dist: {
                files: {
                    'css/screen.css': 'sass/screen.scss'
                }
            }
        },*/
        processhtml: {
            build: {
                files: {
                    'prod/index.html': ['index.html']
                }
            }
        },
        copy: {
            main: {
                files: [
                    {expand: true, src: ['favicon.ico'], dest: 'prod/', filter: 'isFile'},
                    {expand: true, src: ['js/vendor/*'], dest: 'prod/', filter: 'isFile'}
                ],
            },
        },
        watch: {
            options: { livereload: true, },
            css: {
                files: ['sass/*.scss'],
                tasks: ['compass']
            },
            html: {
                files: ['*.html','**/*.css']
            }
        },
        uncss: {
            dist: {
                files: {
                    'css/tidy.css': ['index.html']
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-copy');
    //grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-processhtml');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-uncss');
    grunt.loadNpmTasks('grunt-contrib-compass');

    grunt.registerTask('default', ['compass', 'uglify', 'imagemin', 'cssmin', 'processhtml', 'copy']);
    grunt.registerTask('landing', ['compass', 'uglify', 'imagemin', 'uncss', 'cssmin', 'processhtml', 'copy']);

};