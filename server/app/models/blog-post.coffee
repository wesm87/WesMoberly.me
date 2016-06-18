###
# Blog post model + schema
###

# Dependencies
slugify       = require 'slug'
restful       = require 'node-restful'
autoIncrement = require 'mongoose-auto-increment'
mongoose      = restful.mongoose


# Schema options
options =
	timestamps:
		createdAt: 'datePosted'
		updatedAt: 'dateModified'

# Schema properties + types
properties =
	title:
		type:     String
		required: true
	content:
		type:     String
		required: false
	author:
		type:     String
		default:  'Wes Moberly'
	isDraft:
		type:     Boolean
		default:  true

# Create the schema
schema = new mongoose.Schema( properties, options )

# Add virtual property getters & setters
schema.virtual( 'slug' ).get( -> slugify( @title, lower: true ) )

# Add auto-incrementing numeric post ID
schema.plugin( autoIncrement.plugin,
	model:   'post'
	field:   'postID'
	startAt: 1
)

model = restful.model( 'post', schema )

model.methods([ 'get', 'post', 'put', 'delete' ])

module.exports = model
