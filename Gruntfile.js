module.exports = function(grunt) {
	
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		
		uglify: {
			release: {
				files: [
					{
						'markup/scripts/app.js' : ['assets/scripts/_functions/*.js']
					},
					{
						'markup/scripts/plugins.js' : ['assets/scripts/_plugins/*.js']
					}
				]
			}
		},
		jshint: {
			files: {
				src: ['assets/scripts/**/*.js', '!assets/scripts/**/_plugins/*.js', '!assets/scripts/**/modernizr*.js']
			}
		},
		compass: {
			dist: {
				options: {
					sassDir: 'assets/scss',
					cssDir: 'markup/css',
					outputStyle: 'compact'
				}
			},
			release: {
				options: {
					sassDir: 'assets/scss',
					cssDir: 'markup/css',
					outputStyle: 'compressed'
				}
			}
		},
		concat: {
			appjs: {
				src: 'assets/scripts/_functions/*.js',
				dest: 'markup/scripts/app.js'

			}
		},
		imagemin: {
			dist: {
				options: {
					optimizationLevel: 4
				},
				files: [
					{
						expand: true,
						cwd: 'assets/images/',
						src: ['**/*.{png,jpg,jpeg,gif}'],
						dest: 'markup/img/'
					}
				,
				]
			}
		},
		bake: {
			dist: {
				files: [
					{
						expand: true,
						cwd: 'assets/html/',
						src: ['**/*.htm','!**/_partials/*.htm'],
						dest: 'markup/'
					}
				]
			}
		},
		connect: {
			server: {
				options: {
					port: 8080,
					hostname: '*',
					base: 'markup',
					open: 'http://dwiklund.local:8080',
					livereload: true
				}
			}
		},
		watch: {
			compass: {
				files: ['assets/scss/**/*.scss'],
				tasks: ['compass:dist'],
				options: {
					livereload: true
				}
			},
			jsHint: {
				files: ['assets/scripts/**/*.js', '!assets/scripts/**/*.min.js', '!assets/scripts/**/plugins/*.js'],
				tasks: ['jshint']
			},
			jsConcat: {
				files: ['assets/scripts/**/*.js'],
				tasks: ['concat']
			},
			imgOptimize: {
				files: ['assets/images/**/*.{png,jpg,jpeg,gif}'],
				tasks: ['imagemin']
			},
			bake: {
				files: ['assets/html/**/*.htm'],
				tasks: ['bake'],
				options: {
					livereload: true
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-compass');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-imagemin');
	grunt.loadNpmTasks('grunt-bake');

	grunt.registerTask('default', ['concat','connect','watch']);
	grunt.registerTask('release', ['uglify','compass:release']);
};