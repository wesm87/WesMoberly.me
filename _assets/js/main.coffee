# Dependencies (loaded via Browserify).
$        = require 'jquery'
_        = require 'underscore'
Backbone = require 'backbone'

# Initialize app when DOM is ready.
$ -> App.init()

# App base config & init function.
App =

	Mixins:

		PageView:

			viewName: ''

			template: _.template( $( "script[name=#{ @viewName }]" ).html() )

			render: ->

				@$el.html( this.template() ) if @viewName

				return App.Extensions.View::render.apply( this, arguments )



App.Extensions =

	View: Backbone.View.extend(

		initialize: ->
			router = new App.Router

		render: ( options ) ->

			options ||= {}

			@$el.addClass( 'page' ) if options.page

			return this

		transitionIn: ( callback ) ->

			_.delay( =>
				@$el.addClass( 'is-visible' )

				@$el.one( 'transitionend', ->
					callback() if _.isFunction( callback )
				)
			, 100 )

		transitionOut: ( callback ) ->

			@$el.removeClass( 'is-visible' )

			@$el.one( 'transitionend', ->
				callback() if _.isFunction( callback )
			)
	)



App.Router = Backbone.Router.extend(

	routes:
		''          : 'home'
		'blog'      : 'blog'
		'contact'   : 'contact'
		'portfolio' : 'portfolio'

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

			if ( prev ) then prev.transitionOut( -> prev.remove() )

			next.render( page: true )
			@$el.append( next.$el )
			next.transitionIn()
			@currentPage = next
	)

	Home: App.Extensions.View.extend(
		_.extend( App.Mixins.PageView,
			className: 'home'
			viewName:  'home'
		)
	)

	Portfolio: App.Extensions.View.extend(
		_.extend( App.Mixins.PageView,
			className: 'portfolio'
			viewName:  'portfolio'
		)
	)

	Blog: App.Extensions.View.extend(
		_.extend( App.Mixins.PageView,
			className: 'blog'
			viewName:  'blog'
		)
	)

	Contact: App.Extensions.View.extend(
		_.extend( App.Mixins.PageView,
			className: 'contact'
			viewName:  'contact'
		)
	)
