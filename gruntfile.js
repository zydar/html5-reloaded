module.exports = grunt => {

    require('load-grunt-tasks')(grunt);
    // Project configuration.
    grunt.initConfig({
      pkg: grunt.file.readJSON('package.json'),
      uglify: {
        options: {
          banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
        },
        build: {
          src: [
              'node_modules/jquery/dist/jquery.min.js',
              'node_modules/angular/angular.min.js',
              'node_modules/bootstrap/dist/js/bootstrap.min.js',
              'build.js'
            ],
          dest: 'build/js/<%= pkg.name %>.min.js'
        }
      },
      cssmin: {
        options: {
          mergeIntoShorthands: false,
          roundingPrecision: -1
        },
        target: {
          files: {
            'build/css/<%= pkg.name %>.min.css': [
                'node_modules/bootstrap/dist/css/bootstrap.min.css', 
                'node_modules/bootstrap/dist/css/bootstrap-theme.min.css',
                'src/css/**/*.css'
            ]
          }
        }
      },
      copy: {
        main: {
          files: [
            {
              expand: true,
              cwd: 'node_modules/bootstrap/dist/fonts',
              src: '**',
              dest: 'build/fonts'
            },{
              expand: true,
              cwd: 'src/json',
              src: '**',
              dest: 'build/json'
            },{
              expand: true,
              cwd: 'src',
              src: '**/*.html',
              dest: 'build'
            }
          ],
        },
      },
      babel: {
        options: {
          sourceMap: false,
          presets: ["es2015"],
        },
        main: {
          files: {
            "build.js": 'built.js'
          }
        },
        local: {
          files: {
            "build/js/localStorageClass.js": 'src/js/localStorageClass.js'
          }
        },
      },
      concat: {
        options: {
          separator: ';',
        },
        dist: {
          src: [
              'src/js/*.js',
              'src/js/factory/*.js',
              'src/js/controller/*.js'
          ],
          dest: 'built.js',
        },
      },
      clean: ['build/'],
      watch: {
        scripts: {
          files: ['src/js/**/*.js', 'src/css/**/*.css', 'src/**/*.html'],
          tasks: ['dev'],
          options: {
              spawn: false,
              event: ['changed', 'added', 'deleted']
          },
        },
        babel: {
          files: ['./src/js/localStorageClass.js'],
          tasks: ['local'],
          options: {
              spawn: false,
              event: ['changed', 'added', 'deleted']
          },
        }
      }
    });
  
    // Load the plugin that provides the "uglify" task.
    // load-grunt-tasks modul telepítése után már ez nem kell
    /* grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-babel'); */
  
    // Default task(s).
    grunt.registerTask('dev', ['clean', 'concat', 'babel:main', 'uglify', 'cssmin', 'copy']);
    grunt.registerTask('local', ['babel:local']);
    grunt.registerTask('default', ['watch:scripts']);
  
  };