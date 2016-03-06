`import Ember from 'ember'`

ApplicationRoute = Ember.Route.extend(

	model: ->
		Ember.RSVP.hash(
			portfolioItems: this.store.findAll( 'portfolio-item' )
			posts: this.store.query( 'post', limit: 6 )
		)

	setupController: ( controller, model ) ->
		controller.setProperties( model )

)

`export default ApplicationRoute`
