/* jshint node:true */
/* global require, module */

var EmberApp = require( 'ember-cli/lib/broccoli/ember-app' );

module.exports = function( defaults ) {

	var app = new EmberApp( defaults, {

		outputPaths: {
			app: {
				css: {
					'app': '/assets/css/app.css'
				},
				js: '/assets/js/app.js',
			},
			vendor: {
				css: '/assets/css/vendor.css',
				js: '/assets/js/vendor.js',
			},
		},

		sassOptions: {
			includePaths: [
				`${defaults.project.bowerDirectory}/bootstrap/scss`,
			],
		},

		autoprefixer: {
			browsers: [ 'last 3 versions', 'ie > 8', '> 5%' ],
			remove: false,
		},

	});

	// Use `app.import` to add additional libraries to the generated
	// output files.
	//
	// If you need to use different assets in different
	// environments, specify an object as the first parameter. That
	// object's keys should be the environment name and the values
	// should be the asset to use in that environment.
	//
	// If the library that you are including contains AMD or ES6
	// modules that you would like to import into your application
	// please specify an object with the list of modules as keys
	// along with the exports of each module as its value.

	// Bootstrap
	// app.import( `${app.bowerDirectory}/tether/dist/js/tether.min.js` );
	app.import( `${app.bowerDirectory}/bootstrap/dist/js/umd/collapse.js` );

	// Hightlight.js
	app.import( `${app.bowerDirectory}/highlightjs/styles/monokai.css` );
	app.import( `${app.bowerDirectory}/highlightjs/highlight.pack.min.js` );
	// app.import( `${app.bowerDirectory}/code-highlight-linenums/code-highlight-linenums.js` );

	// Marked
	app.import( `${app.bowerDirectory}/marked/marked.min.js` );

	// Simple Markdown Editor
	app.import( `${app.bowerDirectory}/simplemde/dist/simplemde.min.css` );
	app.import( `${app.bowerDirectory}/simplemde/dist/simplemde.min.js` );

	return app.toTree();

};
