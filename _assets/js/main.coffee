# Dependencies (loaded via Browserify).
$        = require 'jquery'
_        = require 'underscore'
Backbone = require 'backbone'

# Initialize app when DOM is ready.
$ -> App.init()

# App base config & init function.
App =
	instance: null

	Extensions: {}
	Views: {}
	Router: null
	Mixins:
		PageView:

			viewName: ''

			render: ->

				if ( @viewName )
					template = _.template( $( "script[name=#{@viewName}]" ).html() )
					@$el.html( template() )

				return App.Extensions.View.prototype.render.apply( this, arguments )

	init: ->

		App.instance = new App.Views.App()
		Backbone.history.start()


App.Extensions =
	View: Backbone.View.extend(

		initialize: ->
			router = new App.Router

		render: ( options ) ->

			options ||= {}

			if options.page
				@$el.addClass( 'page' )

			return this

		transitionIn: ( callback ) ->

			_.delay( =>
				@$el.addClass( 'is-visible' )

				@$el.one( 'transitionend', ->
					callback() if ( _.isFunction( callback ) )
				)
			, 100 )

		transitionOut: ( callback ) ->

			@$el.removeClass( 'is-visible' )

			@$el.one( 'transitionend', ->
				callback() if ( _.isFunction( callback ) )
			)
	)

App.Router = Backbone.Router.extend(

	routes:
		'':          'home'
		'portfolio': 'portfolio'
		'blog':      'blog'
		'contact':   'contact'

	home: ->
		App.instance.goto( new App.Views.Home() )

	activity: ->
		App.instance.goto( new App.Views.Activity() )

	portfolio: ->
		App.instance.goto( new App.Views.Portfolio() )

	blog: ->
		App.instance.goto( new App.Views.Blog() )

	contact: ->
		App.instance.goto( new App.Views.Contact() )

)

App.Views =
	App: App.Extensions.View.extend(

		el: 'body'
		currentPage: null

		goto: ( view ) ->

			next = view
			prev = @currentPage

			if ( prev )
				prev.transitionOut( -> prev.remove() )

			next.render({ page: true })
			@$el.append( next.$el )
			next.transitionIn()
			@currentPage = next
	)

	Home: App.Extensions.View.extend(
		_.extend( App.Mixins.PageView, {
			className: 'home'
			viewName: 'home'
		} )
	)

	Portfolio: App.Extensions.View.extend(
		_.extend( App.Mixins.PageView, {
			className: 'portfolio'
			viewName: 'portfolio'
		} )
	)

	Blog: App.Extensions.View.extend(
		_.extend( App.Mixins.PageView, {
			className: 'blog'
			viewName: 'blog'
		} )
	)

	Contact: App.Extensions.View.extend(
		_.extend( App.Mixins.PageView, {
			className: 'contact'
			viewName: 'contact'
		} )
	)
