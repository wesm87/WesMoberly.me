/* globals blanket, module */

var options = {
	modulePrefix: 'wesm',
	filter: '//.*wesm/.*/',
	antifilter: '//.*(components/(liquid-|lf-|lm-)|config|initializers|services|template|tests|transitions).*/',
	loaderExclusions: [
		'wesm/config/environment',
		'wesm/initializers/app-version',
		'wesm/initializers/export-application-global'
	],
	enableCoverage: true,
	branchTracking: true,
	cliOptions: {
		autostart: true,
		reporters: ['lcov'],
		lcovOptions: {
			outputFile: 'coverage/lcov.info'
		}
	}
};

if ( typeof blanket !== 'undefined' ) {
	blanket.options( options );
}

if ( typeof exports !== 'undefined' ) {
	module.exports = options;
}
