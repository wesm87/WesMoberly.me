###
# Express server
###

# Dependencies
path       = require 'path'
express    = require 'express'
bodyParser = require 'body-parser'

# Server port number
global.__serverPort = process.env.PORT || 4500

# Paths to server and ember app directories
global.__serverPath = path.resolve( './app' )
global.__emberPath  = path.resolve( '../ember/dist' )

# Main app instance
app = express()

# Include static assets from Ember app
app.use express.static( __emberPath )

# Add body parser middlewares
app.use bodyParser.urlencoded( extended: true )
app.use bodyParser.json()

# Create database connection
dbConnection = require "#{ __serverPath }/database/connection"

# REST API router
app.use '/api/v1', [
	require "#{ __serverPath }/middlewares/rest-api"
	require "#{ __serverPath }/routers/rest-api"
]

# Front-end router for non-API requests
app.use /^(?!\/api\/).*$/, [
	require "#{ __serverPath }/routers/ember"
]

startServer = ->
	# Listen for requests
	server = app.listen __serverPort, ->

		console.log 'Server running at http://%s:%d/', 'localhost', __serverPort

		# Make sure we're not running as root
		if process.getgid() == 0
			process.setgid 'nobody'
			process.setuid 'nobody'

	# Shut down the server when a SIGTERM is received
	process.on 'SIGTERM', ->
		server?.close -> process.disconnect?()

if ! module.parent
	startServer()

module.exports = startServer
