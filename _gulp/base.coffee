gulp         = require 'gulp'
browserSync  = require 'browser-sync'

module.exports = class GulpBase

	constructor: ( @config ) ->
		if ! @config then @config = new ( require './config' )

	notify: ( message ) ->

		return unless message?

		console.log( message ) if @config.debug
		browserSync.notify( message )

	task: ( name, task = null ) =>

		# If the task callback is a string, see if it matches an instance method.
		task = this[ task ] if typeof task is 'string'

		# See if we have a valid task callback.
		if ! task?

			# If not, see if the task name matches an instance method.
			if typeof name is 'string' and typeof this[ name ] is 'function'

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
