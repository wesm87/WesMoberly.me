module.exports = class GulpConfig

	debug: true

	paths:
		source: '_assets'
		dest:   '_site/_assets'
		css:    'css'
		js:     'js'
		img:    'img'

	constructor: ->

		# Store file paths in a class property.
		@files =
			jekyll:
				watch:  [
					'_config.yml'
					'_includes/*'
					'_layouts/*'
					'_posts/*'
					'*.md'
					'*.html'
				]
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
