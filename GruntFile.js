"use strict";

module.exports = function (grunt) {

    grunt.initConfig({
        copy: {
            build: {
                files: {
                    'build/angular-zeroclipboard.js': 'src/angular-zeroclipboard.js',
                }
            }
        },
        uglify: {
            build: {
                options: {sourceMap: true},
                src: 'build/angular-zeroclipboard.js',
                dest: 'build/angular-zeroclipboard.min.js'
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('default', ['copy', 'uglify']);
};
