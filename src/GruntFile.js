module.exports = function (grunt) {

    grunt.loadNpmTasks('grunt-contrib-jasmine');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.initConfig({

        jshint: {
            all: [
                '*.js',
                '!*.min.js',
            ]
        },

        jasmine: {
            test: {
                src: 'nspace.js',
                options: {
                    specs: 'nspace.test.js',
                },
            }
        },

        uglify: {
            all: {
                files: {
                    '../dist/nspace.min.js': 'nspace.js',
                }
            }
        },
    });

    grunt.registerTask('test', ['jshint', 'jasmine']);
    grunt.registerTask('build', ['jshint', 'uglify']);
    grunt.registerTask('default', function () {
        grunt.log.ok('So vast!');
    });
};
