module.exports = function(grunt) {
  'use strict';

  grunt.initConfig({
    jshint: {
      options: {
        jshintrc: true,
      },
      files: ['./*.js', './configs/*.js' ,'./src/app/**/*.js']
    },
    watch: {
      //files: ['<%= jshint.files %>'],
      //tasks: ['jshint']
    },
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('server', 'Start an express server. Use as `grunt server watch`.',
    function() {
      grunt.log.writeln('Starting web server...');
      require('./server');
    }
  );

  grunt.registerTask('default', ['jshint', 'server', 'watch']);
};
