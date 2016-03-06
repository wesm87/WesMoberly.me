`import Ember from 'ember'`

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

	isEditPage: Ember.computed 'isEditPage', ->
		@get( 'navigator' ).currentNode == 'edit'

	didRender: ->

		@_super( arguments... )

		this.$( 'pre code' ).each ( index, element ) ->
			hljs.highlightBlock( element )

)

`export default BlogPostComponent`
