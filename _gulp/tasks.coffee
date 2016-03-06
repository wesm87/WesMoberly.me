# Gulp / Utils
gulp        = require 'gulp'
cp          = require 'child_process'

# Files
rename      = require 'gulp-rename'
concat      = require 'gulp-concat'
sourcemaps  = require 'gulp-sourcemaps'

# CSS / SASS
sass        = require 'gulp-sass'
prefix      = require 'gulp-autoprefixer'
cssMin      = require 'gulp-cssmin'
unCSS       = require 'gulp-uncss'
mergeMQ     = require 'gulp-merge-media-queries'

# JS / CoffeeScript
uglify      = require 'gulp-uglify'
coffeelint  = require 'gulp-coffeelint'
browserify  = require 'gulp-browserify'
modernizr   = require 'gulp-modernizr'
stripDebug  = require 'gulp-strip-debug'

# Dev Tools
codecov     = require 'gulp-codecov'
browserSync = require 'browser-sync'




GulpBase = require './base'

module.exports = class extends GulpBase

	constructor: ->

		super()

		@files = @config.files

		browserSync.create()

		# Compile assets.
		this.task 'jekyll'
		this.task 'css'
		this.task 'js'

		# Watch for file changes.
		this.task 'watch'

		# BrowserSync.
		this.task 'browser-sync', 'browserSync'

		# Watch + BrowserSync.
		this.task 'sync'

		# Linting & unit tests.
		this.task 'lint'
		this.task 'test'
		this.task 'codecov'

		# Build tasks.
		this.task 'build'
		this.task 'compile', 'build'

		# Default task.
		this.task 'default'

	default: => gulp.series [
		this.build()
		this.sync()
	]

	build: => gulp.series [
		this.jekyll
		this.css
		this.js
		this.modernizr
		this.lint
		# this.test
		this.codecov
	]

	sync: => gulp.parallel [
		this.watch
		this.browserSync
	]

	watch: =>

		gulp.watch( @files.jekyll.watch, this.build() )
		gulp.watch( @files.css.watch,    this.css     )
		gulp.watch( @files.js.watch,     this.js      )

	browserSync: ->

		browserSync.init(
			logPrefix: 'WesMoberly'
			server:
				baseDir: '_site'
		)

	jekyll: =>

		this.notify( 'Running Jekyll build' )

		command = [ 'build', '--config=_config.yml' ]
		cp.spawn( 'jekyll', command, stdio: 'inherit' )

	css: =>

		this.notify( 'Compiling Sass files' )

		sassOptions =
			precision: 10
			outputStyle: 'expanded'
			includePaths: [ 'node_modules' ]

		gulp.src(  @files.css.src )
			.pipe sass( sassOptions )
			.pipe concat( 'all.css' )
			.pipe prefix( 'last 3 versions', '> 1%' )
			.pipe mergeMQ()
			.pipe unCSS(
				html: [ '_site/**/*.html' ]
				ignore: [ '/*backdropfilter*/' ]
			)
			.pipe sourcemaps.init()
			.pipe gulp.dest( @files.css.dest )
			.pipe cssMin()
			.pipe rename( suffix: '.min' )
			.pipe sourcemaps.write( './maps' )
			.pipe gulp.dest( @files.css.dest )
			.pipe browserSync.stream( once: true )

	js: =>

		this.notify( 'Compiling CoffeeScript files' )

		gulp.src(  @files.js.src, read: false )
			.pipe browserify( transform: ['coffeeify'], extensions: ['.coffee'] )
			.pipe concat( 'all.js' )
			.pipe sourcemaps.init()
			.pipe gulp.dest( @files.js.dest )
			.pipe uglify()
			.pipe rename( suffix: '.min' )
			.pipe sourcemaps.write( './maps' )
			.pipe gulp.dest( @files.js.dest )
			.pipe browserSync.stream( once: true )

	modernizr: =>

		this.notify( 'Creating custom Modernizr build' )

		gulp.src( "#{@files.js.dest}/all.js" )
			.pipe modernizr(
				options: [ 'setClasses' ]
				tests: [ 'backdropfilter' ]
			)
			.pipe gulp.dest( @files.js.dest )
			.pipe uglify()
			.pipe rename( suffix: '.min' )
			.pipe gulp.dest( @files.js.dest )

	###
	# TODO: Add Sass and Markdown linting. See if a linter exists for Liquid.
	###
	lint: =>
		this.coffeelint()

	###
	# TODO: Implement unit tests
	###
	test: =>
		this.notify( 'Running unit tests' )

	codecov: =>
		this.notify( 'Checking unit test code coverage' )

		gulp.src( './coverage/lcov.info' )
			.pipe codecov()

	coffeelint: =>

		this.notify( 'Linting CoffeeScript files' )

		gulp.src(  @files.js.src )
			.pipe coffeelint()
			.pipe coffeelint.reporter( 'coffeelint-stylish' )
