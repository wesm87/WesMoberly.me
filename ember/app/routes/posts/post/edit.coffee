`import Ember from 'ember'`
`import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin'`

PostsPostEditRoute = Ember.Route.extend(

	session: Ember.inject.service()

	beforeModel: ( transition ) -> maybeRedirect( null, transition )

	afterModel: ( model, transition ) -> maybeRedirect( model, transition )

	maybeRedirect: ( model, transition ) ->

		if @get 'session.isAuthenticated'
			@_super( arguments... )
		else
			transition.abort()
			@set 'session.attemptedTransition', transition

			if model
				this.transitionTo( 'posts.post', model )
			else
				this.transitionTo( 'posts.post' )


	renderTemplate: -> this.render 'posts.post.edit', into: 'application'

)

`export default PostsPostEditRoute`
