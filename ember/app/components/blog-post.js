import Ember from 'ember';
import ENV   from 'wesm-ember-app/config/environment';

export default Ember.Component.extend({

	tagName: 'article',

	classNames: [
		'page-section',
		'page-section--blog-post',
	],

	classNameBindings: [
		'isEditPage',
	],

	session:   Ember.inject.service(),

	navigator: Ember.inject.service(),

	isAuthenticated: Ember.computed( 'isAuthenticated', () => {

		if ( 'development' === ENV.environment ) {
			return true;
		}

		const session = this.get( 'session' );

		if ( session ) {
			return session.isAuthenticated;
		}

		return false;
	}),

	isEditPage: Ember.computed( 'isEditPage', () => {

		const navigator = this.get( 'navigator' );

		if ( navigator ) {
			return ( 'edit' === navigator.currentNode );
		}

		return false;
	}),

	didRender() {
		this._super( ...arguments );

		this.$( 'pre code' ).each( ( index, element ) => {
			window.hljs.highlightBlock( element );
		});
	},

});
