module.exports = function(grunt) {
	
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		
		uglify: {
			release: {
				files: [
					{
						expand: true,
						cwd: 'assets/scripts/',
						src: ['**/*.js','!**/_plugins/*.js','!**/*.min.js'],
						dest: 'markup/js/min/',
						ext: '.min.js'
					},
					{
						'markup/js/plugins-comb.min.js' : ['assets/scripts/_plugins/*.js']
					}
				]
			}
		},
		jshint: {
			files: {
				src: ['assets/scripts/**/*.js', '!assets/scripts/**/_plugins/*.js', '!assets/scripts/**/modernizr*.js']
			}
		},
		copy: {
			dist: {
				files: [
					{
						expand: true,
						cwd: 'assets/fonts/',
						src: ['*.*'],
						dest: 'markup/css/fonts/'
					},
					{
						expand: true,
						src: ['assets/scripts/**/modernizr*.js'],
						dest: ['markup/js']
					}
				]
			}
		},
		compass: {
			dist: {
				options: {
					sassDir: 'assets/scss'
					cssDir: 'markup/css'
					outputStyle: 'compact'
				}
			},
			release: {
				options: {
					sassDir: 'assets/scss'
					cssDir: 'markup/css'
					outputStyle: 'compressed'
				}
			}
		},
		concat: {
			appjs: {
				src: 'assets/scripts/functions/*.js',
				dest: 'markup/js/app.js'

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
		watch: {
			compass: {
				files: ['assets/scss/**/*.scss'],
				tasks: ['compass:dist']
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
				tasks: ['bake']
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-compass');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-imagemin');

	grunt.registerTask('default', ['watch']);
	grunt.registerTask('release', ['uglify']);
};