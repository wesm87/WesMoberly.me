import Ember from 'ember';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';

export default Ember.Route.extend( ApplicationRouteMixin, {

	model() {
		return Ember.RSVP.hash({
			portfolioItems: this.store.findAll( 'portfolio-item' ),
			posts: this.store.findAll( 'post' )
		});
	},

	setupController( controller, model ) {
		controller.setProperties( model );
	}

});
