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
                    'prod/css/screen.min.css': ['css/screen.css']
                }
            }
        },
        sass: {
            options: {
                sourceMap: false
            },
            dist: {
                files: {
                    'css/screen.css': 'scss/screen.scss'
                }
            }
        },
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
                    {expand: true, src: ['js/vendor/*'], dest: 'prod/js/vendor/', filter: 'isFile'}
                ],
            },
        },
        watch: {
            options: { livereload: true, },
            css: {
                files: ['scss/*.scss'],
                tasks: ['sass']
        }
    }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-processhtml');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['uglify', 'imagemin', 'sass', 'cssmin', 'processhtml', 'copy']);

};