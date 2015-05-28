// Configuration for jade task(s)
// Compile jade templates into HTML
'use strict';

var taskConfig = function(grunt) {

  grunt.config.set('jade', {
    dist: {
      options: {
        pretty: true,
        client: false,
        data: {
          debug: false,
          env: 'development',
          messages: {} // Avoid errors with navbar
        }
      },
      expand: true,
      cwd: '<%= yeogurt.server %>/templates/',
      dest: '<%= yeogurt.tmp %>/',
      src: ['**/*.jade'],
      ext: '.html'
    },
  });

};

module.exports = taskConfig;
