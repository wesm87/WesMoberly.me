`import Ember from 'ember'`
`import ENV from 'wesm-ember-app/config/environment'`

BlogPostComponent = Ember.Component.extend(

	tagName: 'article'

	classNames: [
		'page-section'
		'page-section--blog-post'
	]

	classNameBindings: [
		'isEditPage'
	]

	session:   Ember.inject.service()

	navigator: Ember.inject.service()

	isAuthenticated: Ember.computed 'isAuthenticated', ->
		return true if ENV.environment == 'development'
		@get( 'session' )?.isAuthenticated

	isEditPage: Ember.computed 'isEditPage', ->
		@get( 'navigator' )?.currentNode == 'edit'

	didRender: ->

		@_super arguments...

		@$( 'pre code' ).each ( index, element ) ->
			hljs.highlightBlock( element )

)

`export default BlogPostComponent`
