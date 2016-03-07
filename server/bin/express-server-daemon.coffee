# First we need to daemonize the process.
# Anything above this call is run twice.
require( 'daemon' )()

# Dependencies
system  = require 'os'
cluster = require 'cluster'

# Get number of CPUs
numCPUs = system.cpus().length

###
# Creates a new worker when running as cluster master.
# Runs the HTTP server otherwise.
###
createWorker = ->

	if cluster.isMaster
		# Fork a worker if running as cluster master
		child = cluster.fork()

		# Respawn the child process after exit
		# (ex. in case of an uncaught exception)
		child.on 'exit', ( code, signal ) -> createWorker()
	else
		# Start the server if running as worker
		require '../app.coffee'

###
# Creates the specified number of workers.
#
# @param  {Number} n Number of workers to create.
#                    Defaults to the number of CPUs.
###
createWorkers = ( n = numCPUs ) -> createWorker() while ( n -= 1 )

###
# Kills all workers with the given signal.
# Also removes all event listeners from workers before sending the signal
# to prevent respawning.
#
# @param  {Number} signal
###
killAllWorkers = ( signal ) ->
	for own uniqueID of cluster.workers
		worker = cluster.workers[ uniqueID ]
		worker.removeAllListeners()
		worker.process.kill signal

###
# Restarts the workers.
###
process.on 'SIGHUP', ->
	killAllWorkers 'SIGTERM'
	createWorkers()

###
# Gracefully Shuts down the workers.
###
process.on 'SIGTERM', ->
	killAllWorkers 'SIGTERM'

# Create workers.
createWorkers()
