/* globals blanket, module */

const options = {

	modulePrefix: 'wesm-ember-app',

	filter:     '//.*wesm-ember-app/.*/',
	antifilter: '//.*(components/(liquid-|lf-|lm-)|config|initializers|services|template|tests|transitions).*/',

	loaderExclusions: [
		'wesm-ember-app/config/environment',
		'wesm-ember-app/initializers/app-version',
		'wesm-ember-app/initializers/export-application-global',
	],

	enableCoverage: true,
	branchTracking: true,

	cliOptions: {
		autostart:   true,
		reporters:   [ 'lcov' ],
		lcovOptions: {
			outputFile: 'coverage/lcov.info',
		},
	},

};

if ( typeof blanket !== 'undefined' ) {
	blanket.options( options );
}

if ( typeof exports !== 'undefined' ) {
	module.exports = options;
}
