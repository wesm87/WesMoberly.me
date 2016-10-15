import Ember  from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
	location: config.locationType,
});

Router.map(function appRouter() {

	this.route( 'about' );

	this.route( 'portfolio', () => {
		this.route( 'new' );
		this.route( 'item', { path: '/:item_id' }, () => {
			this.route( 'edit' );
		});
	});

	this.route( 'posts', () => {
		this.route( 'new' );
		this.route( 'post', { path: '/:post_id' }, () => {
			this.route( 'edit' );
		});
	});
});

export default Router;
