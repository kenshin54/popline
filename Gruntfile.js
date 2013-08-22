module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> v<%= pkg.version %> | author: <%= pkg.author %> */\n'
      },
      target: {
        files: {
          'build/jquery.<%= pkg.name %>.min.js': ['scripts/jquery.<%= pkg.name %>.js', 'scripts/plugins/jquery.popline.link.js', 'scripts/plugins/jquery.popline.blockquote.js', 'scripts/plugins/jquery.popline.decoration.js', 'scripts/plugins/jquery.popline.list.js', 'scripts/plugins/jquery.popline.justify.js', 'scripts/plugins/jquery.popline.blockformat.js', 'scripts/plugins/jquery.popline.social.js', 'scripts/plugins/jquery.popline.email.js']
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask('default', ['uglify']);

};
