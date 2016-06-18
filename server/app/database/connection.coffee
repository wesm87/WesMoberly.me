###
# Database connection / configuration
###

# Dependencies
mongoose      = require 'mongoose'
autoIncrement = require 'mongoose-auto-increment'

# Connect to DB
mongoose.connect 'mongodb://localhost/ember-data'

# Initialize auto-increment plugin
autoIncrement.initialize mongoose.connection

module.exports = mongoose.connection
