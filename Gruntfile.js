module.exports = function(grunt) {
  "use strict"

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {

      options: {
        footer: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
        mangle: true,
        compress: true,
        beautify: false,
        sourceMap: true
      },

      app: {
        src: [
            './js/require.js',
            './js/app.js', 
            './js/components.js', 
        ],
        dest: './dist/js/app.min.js'
      },

      vendor: {
        src: [
            './bower_components/jquery/dist/jquery.min.js',
            './bower_components/underscore/underscore-min.js',
            './bower_components/backbone/backbone-min.js',  
        ],
        dest: './dist/js/vendor.min.js'
      },

      components: {

        files: [{
          expand: true,
          cwd: './js/components',
          //src: '*.js',
          src: 'comments.js',
          dest: './dist/js/components'
        }]

      }

    },

    clean: ['./dist/js', 'dist/css'],

    connect: {
      dev: {
        options: {
          base: 'dist',
          keepalive: true,
          open: true
        }
      }
    },

    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      build: {
        src: ['./js/app.js', './js/components/*.js'],
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

  //grunt.registerTask('default', ['jshint', 'clean', 'uglify:app', 'uglify:vendor','uglify:components', 'sass']);
  grunt.registerTask('default', []);



};