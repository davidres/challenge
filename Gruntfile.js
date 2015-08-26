module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    connect: {
      server: {
        options: {
          hostname: 'localhost',
          port: 8888,
          open: false,
          base: '',
          keepalive: true
        }
      }
    },
    watch: {
      styles: {
        files: ['**/*.scss','**/*.js'],
        tasks: ['compass:dev', 'jshint']
      },
    },
    jshint: {
      all: ['Gruntfile.js', 'scripts/**/*.js']
    },
    compass: {                  // Task 
      dist: {                   // Target 
        options: {              // Target options 
          sassDir: 'scss',
          cssDir: 'styles',
          environment: 'production'
        }
      },
      dev: {                    // Another target 
        options: {
          sassDir: 'scss',
          cssDir: 'styles',
          basePath : 'public/'
        }
      }
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');

  // Default task(s).
  grunt.registerTask('default', ['connect:server','watch']);

};