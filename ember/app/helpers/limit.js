import Ember from 'ember';

const limit = ( params ) => {
	let [ array, limit ] = params;
	return array.slice( 0, limit );
};

export { limit };

export default Ember.Helper.helper( limit );
