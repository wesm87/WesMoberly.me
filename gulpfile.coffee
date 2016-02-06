# Gulp / Utils
gulp         = require 'gulp'
cp           = require 'child_process'

# Files
rename       = require 'gulp-rename'
concat       = require 'gulp-concat'
sourcemaps   = require 'gulp-sourcemaps'

# CSS / SASS
sass         = require 'gulp-sass'
prefix       = require 'gulp-autoprefixer'
cssMin       = require 'gulp-cssmin'

# JS / CoffeeScript
uglify       = require 'gulp-uglify'
coffee       = require 'gulp-coffee'
coffeelint   = require 'gulp-coffeelint'
browserify   = require 'gulp-browserify'
stripDebug   = require 'gulp-strip-debug'

# Dev Tools
browserSync  = require 'browser-sync'
browserSync.create()


class GulpFile

	debug: true

	paths:
		source: '_assets'
		dest:   '_site/_assets'
		css:    'css'
		js:     'js'
		img:    'img'

	constructor: ->

		###
		# Config
		###

		# Set our file paths.
		this.setFilePaths()


		###
		# Tasks
		###

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

		# Build tasks.
		this.task 'build'
		this.task 'compile', 'build'

		# Default task.
		this.task 'default'

	setFilePaths: =>

		# Store file paths in a class property.
		@files =
			jekyll:
				watch:  "#{@paths.source}/**/*.html, #{@paths.source}/**/*.md"
				ignore: "#{@paths.dest}/**/*"
			css:
				dest:   "#{@paths.dest}/#{@paths.css}"
				watch:  "#{@paths.source}/#{@paths.css}/**/*.scss"
				ignore: "!#{@paths.source}/#{@paths.css}/**/_*.scss"
			js:
				dest:  "#{@paths.dest}/#{@paths.js}"
				watch: "#{@paths.source}/#{@paths.js}/**/*.coffee"

		# Update file paths where necessary.
		for assetType in [ 'jekyll', 'css', 'js' ]

			files = @files[ assetType ]
			return unless files?

			# Create source file list.
			files.src = [
				files.src
				files.watch
				files.ignore
			].filter( ( val ) -> return val? && val )


			@files[ assetType ] = files

	notify: ( message ) ->

		return unless message?

		console.log( message ) if @debug
		browserSync.notify( message )

	task: ( name, task = null ) =>

		# If the task callback is a string, see if it matches an instance method.
		task = this[ task ] if typeof task is 'string'

		# See if we have a valid task callback.
		if ! task?

			# If not, see if the task name matches an instance method.
			if typeof this[ name ] is 'function'

				# We found a matching instance method, let's use that.
				task = this[ name ]
			else

				# No match found, let's bail.
				return

		# Create the Gulp task.
		gulp.task name, ( done ) =>

			# Run the task.
			result = task()

			# If the task returned a function then call that too.
			# (e.g. `gulp.series` or `gulp.parallel`)
			result() if typeof result is 'function'

			# Let Gulp know we're done.
			done()

	default: => gulp.series [
		this.build
		this.sync
	]

	build: => gulp.series [
		this.jekyll
		this.css
		this.js
		this.lint
		# this.test
	]

	sync: => gulp.parallel [
		this.watch
		this.browserSync
	]

	watch: =>

		gulp.watch( @files.jekyll.watch, this.jekyll )
		gulp.watch( @files.css.watch,    this.js   )
		gulp.watch( @files.js.watch,     this.css )

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

		gulp
			.src  @files.css.src
			.pipe sourcemaps.init()
			.pipe sass( sassOptions )
			.pipe concat( 'all.css' )
			.pipe prefix( 'last 3 versions', '> 1%' )
			.pipe gulp.dest( @files.css.dest )
			.pipe cssMin()
			.pipe rename( suffix: '.min' )
			.pipe sourcemaps.write( './maps' )
			.pipe gulp.dest( @files.css.dest )
			.pipe browserSync.stream( once: true )

	###
	# TODO: Get sourcemaps working with Browserify.
	###
	js: =>

		this.notify( 'Compiling CoffeeScript files' )

		gulp
			.src  @files.js.src, read: false
			.pipe sourcemaps.init()
			.pipe browserify( transform: ['coffeeify'], extensions: ['.coffee'] )
			.pipe concat( 'all.js' )
			.pipe gulp.dest( @files.js.dest )
			.pipe uglify()
			.pipe rename( suffix: '.min' )
			.pipe sourcemaps.write( './maps' )
			.pipe gulp.dest( @files.js.dest )
			.pipe browserSync.stream( once: true )

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

	coffeelint: =>

		this.notify( 'Linting CoffeeScript files' )

		gulp
			.src  @files.js.src
			.pipe coffeelint()
			.pipe coffeelint.reporter( 'coffeelint-stylish' )




###
# Init
###
new GulpFile
