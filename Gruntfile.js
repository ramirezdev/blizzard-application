module.exports = function(grunt) {
  "use strict"

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    clean: ['./dist/js', 'dist/css'],

    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      build: {
        src: ['./app/**/*.js'],
      }
    },

    jst: {
      compile: {

        files: {
          "./dist/js/templates.min.js": ["./app/templates/**/*.html"]
        }

      }
    },


    requirejs: {
      compile: {
        options: {
          mainConfigFile: "./app/config.js",
          name: "../bower_components/almond/almond",
          out: "./dist/js/source.min.js",
          optimize: "uglify2",
          wrap: true,
          findNestedDependencies: true
        }
      }
    },


    sass: {

      dist: {                            
        options: {                   
          style: 'expanded',
          noCache: true
        },
        files: {                        
        './dist/css/main.css': './scss/main.scss'
        }
      }
    }


  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-jst');
  grunt.loadNpmTasks('grunt-contrib-requirejs');

  grunt.registerTask('default', ['jshint', 'clean', 'jst', 'requirejs']);
  //grunt.registerTask('default', []);



};