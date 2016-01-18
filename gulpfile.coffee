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
browserify   = require 'gulp-browserify'
stripDebug   = require 'gulp-strip-debug'
imageMin     = require 'gulp-imagemin'

# Dev Tools
browserSync  = require 'browser-sync'
browserSync.create()

# ------------------------------------------------------------------------
# BEGIN CONFIG
# ------------------------------------------------------------------------

class Config
	assetPaths:
		source: '_assets'
		bower:  'bower_components'
		css:    'css'
		js:     'js'
		img:    'img'

	constructor: ->
		# Prepend asset folder paths with "_assets".
		for assetType in [ 'css', 'js', 'img' ]
			@assetPaths[ assetType ] = "#{@assetPaths.source}/#{@assetPaths[ assetType ]}"

		# Store file paths in class property.
		@files =
			jekyll:
				watch:  '**/*.html, **/*.md'
				ignore: '_site/**/*'
			css:
				build: "_site/#{@assetPaths.css}"
				watch: "#{@assetPaths.css}/**/*.scss"
				ignore: "!#{@assetPaths.css}/**/_*.scss"
			js:
				build: "_site/#{@assetPaths.js}"
				watch: "#{@assetPaths.js}/**/*.coffee"

		# Update file paths where necessary.
		for assetType in [ 'jekyll', 'css', 'js' ]
			files = @files[ assetType ]

			if ( files? )

				# Create source file list
				files.src = [
					files.src,
					files.watch,
					files.ignore
				].filter( ( val ) -> return ( val? && val ) )

				if ( files.libs && files.src )
					files.src = files.libs.concat( files.src )


			@files[ assetType ] = files

config = new Config

# ------------------------------------------------------------------------
# END CONFIG
# ------------------------------------------------------------------------

# ------------------------------------------------------------------------
# BEGIN TASKS
# ------------------------------------------------------------------------

gulp.task( 'browser-sync', ->

	return browserSync.init(
		logPrefix: 'WesMoberly'
		# proxy: 'wesmoberly.me.dev'
		# open: 'external'
		# xip: true
		server: {
			baseDir: '_site'
		}
	)
)

gulp.task( 'jekyll', ( done ) ->

	browserSync.notify( 'Running Jekyll build' )

	return cp
		.spawn( 'jekyll', [ 'build', '--config=_config.yml' ], { stdio: 'inherit'} )
		.on( 'close', done )
)

gulp.task( 'css', ->

	browserSync.notify( 'Compiling Sass files' )

	sassOptions =
		precision: 10,
		outputStyle: 'expanded'
		includePaths: [ 'node_modules' ]

	return gulp
		.src  config.files.css.src
		.pipe sourcemaps.init()
		.pipe sass( sassOptions )
		.pipe concat( 'all.css' )
		.pipe prefix( 'last 3 versions', '> 1%' )
		.pipe gulp.dest( config.files.css.build )
		.pipe cssMin()
		.pipe rename( suffix: '.min' )
		.pipe sourcemaps.write( './maps' )
		.pipe gulp.dest( config.files.css.build )
		.pipe browserSync.stream( once: true )
)


###
# TODO: Get sourcemaps working with Browserify.
###
gulp.task( 'js', ->

	browserSync.notify( 'Compiling CoffeeScript files' )

	return gulp
		.src  config.files.js.src, { read: false }
		.pipe sourcemaps.init()
		.pipe browserify({ transform: ['coffeeify'], extensions: ['.coffee'] })
		.pipe concat( 'all.js' )
		.pipe gulp.dest( config.files.js.build )
		.pipe uglify()
		.pipe rename( suffix: '.min' )
		.pipe sourcemaps.write( './maps' )
		.pipe gulp.dest( config.files.js.build )
		.pipe browserSync.stream( once: true )
)

# Rerun the task when a file changes
gulp.task( 'watch', ->

	tasks = [
		'jekyll',
		'css',
		'js'
	]

	for task in tasks
		watchFiles = config.files[ task ].watch

		if ( config.files[ task ].watch )
			gulp.watch( watchFiles, gulp.parallel( task ) )
)

# Build tasks
gulp.task( 'build', gulp.series( 'jekyll', 'css', 'js' ) )
gulp.task( 'compile', gulp.series( 'jekyll', 'css', 'js' ) )

# The default task (called when you run `gulp` from cli)
gulp.task( 'default', gulp.series( 'build', gulp.parallel( 'watch', 'browser-sync' ) ) )


# ------------------------------------------------------------------------
# END TASKS
# ------------------------------------------------------------------------
