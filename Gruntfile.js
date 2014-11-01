/*global module:false*/
module.exports = function(grunt) {

  var filePackage = 'bower.json';
  var fil = grunt.file;
  var pkg = fil.readJSON(filePackage);

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: pkg,
    bannerlg: '/*!\n' +
    ' *\n'+
    ' * <%= pkg.title || pkg.name %> JavaScript Library v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %>\n'+
    ' * <%= pkg.homepage %>\n'+
    ' *\n'+
    ' * Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.authors[0].name %>\n'+
    ' * Released under the <%= pkg.license %> license\n'+
    ' *\n'+
    ' */',
    banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
      '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
      '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
      '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.authors[0].name %>;' +
      ' Licensed <%= pkg.license %> */\n',
    // Task configuration.
    uglify: {
      options: {
        banner: '<%= banner %>',
        mangle: {
          except: ["jQuery",'ecjson']
        }
      },
      dist: {
        src: 'dist/ecjson.js',
        dest: 'dist/ecjson.min.js',
      }
    },
    replace: {
      version: {
        src: ["src/ecjson.js"],
        dest: "dist/",
        replacements: [{
          from: /(ecjson\.version)(.*)(=)(.*)(\').*(\')/g,
          to: "$1$2$3$4$5<%= pkg.version %>$6"
        },
        {
          from: /(\/\*\*%%banner-large%%\*\/)/g,
          to: "<%= bannerlg %>"
        }],
      }
    },
    version: {
      getversion: {
        options: {
          pkg: 'bower.json',
          prefix: 'ecjson\.version\\s+=\\s+[\'"]',
        },
        src: ['src/ecjson.js']
      }
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-text-replace');
  grunt.loadNpmTasks('grunt-version');

  grunt.registerTask('uploadVersion',function(){

    var v = /([0-9]*)\.([0-9]*)\.([0-9]*)/g.exec(pkg.version);
    
    verA = parseInt(v[1]);
    verB = parseInt(v[2]);
    verC = parseInt(v[3]);

    verC += 1;

    pkg.version = verA+'.'+verB+'.'+verC;

    // console.log(v);
    console.log("new version : "+pkg.version);

    fil.write(filePackage,JSON.stringify(pkg,null,2));

  });

  // Default task.
  grunt.registerTask('default', [
    'uploadVersion',
    'replace',
    'uglify',
  ]);

};
