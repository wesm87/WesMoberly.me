import Ember from 'ember';

export default Ember.Route.extend({

	session: Ember.inject.service(),

	beforeModel( transition ) {
		this.maybeRedirect( null, transition );
	},

	afterModel( model, transition ) {
		this.maybeRedirect( model, transition );
	},

	maybeRedirect( model, transition ) {

		if ( this.get( 'session.isAuthenticated' ) ) {

			this._super( ...arguments );
		} else {

			transition.abort();
			this.set( 'session.attemptedTransition', transition );

			if ( model ) {
				this.transitionTo( 'posts.post', model );
			} else {
				this.transitionTo( 'posts.post' );
			}
		}
	},

	renderTemplate() {
		this.render( 'posts.post.edit', { into: 'application' } );
	},

});
