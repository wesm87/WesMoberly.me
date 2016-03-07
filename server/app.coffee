###
# Express server
###

# Dependencies
path       = require 'path'
express    = require 'express'
bodyParser = require 'body-parser'

# Paths to server and ember app directories
global.__serverPath = __dirname
global.__emberPath  = "#{ path.dirname __serverPath }/ember/dist"

# Main app instance
app = express()

# Include static assets from Ember app
app.use express.static( __emberPath )

# Add body parser middlewares
app.use bodyParser.urlencoded( extended: true )
app.use bodyParser.json()

# Create database connection
dbConnection = require './database/connection'

# REST API router
app.use '/api/v1', [
	require './middlewares/rest-api'
	require './routers/rest-api'
]

# Front-end router for non-API requests
app.use /^(?!\/api\/).*$/, [
	require './routers/ember'
]

# Listen for requests
server = app.listen '4500', ->

	console.log 'Server running at http://%s:%d/', 'localhost', 4500

	# Make sure we're not running as root
	if process.getgid() == 0
		process.setgid 'nobody'
		process.setuid 'nobody'

# Shut down the server when a SIGTERM is received
process.on 'SIGTERM', ->
	server?.close -> process.disconnect?()
