module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      build: {
        src: 'dist/jquery-<%= pkg.name %>.js',
        dest: 'dist/jquery-<%= pkg.name %>.min.js'
      }
    },
    qunit: {
        src: ['tests/jquery-cloneya.html']
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  
  grunt.loadNpmTasks('grunt-contrib-qunit');
  
  grunt.registerTask('travis', 'qunit:src');
  
  
  grunt.registerTask('default', ['uglify', 'travis']);
    
    
};