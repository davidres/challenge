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
    sass: {
      dist: {
        files: {
          'main.css': 'main.scss'
        }
      }
    },
    compass: {                  // Task 
      dist: {                   // Target 
        options: {              // Target options 
          sassDir: 'scss',
          cssDir: 'css',
          environment: 'production'
        }
      },
      dev: {                    // Another target 
        options: {
          sassDir: 'scss',
          cssDir: 'css'
        }
      }
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-compass');

  // Default task(s).
  grunt.registerTask('default', ['connect:server','compass:dev']);

};