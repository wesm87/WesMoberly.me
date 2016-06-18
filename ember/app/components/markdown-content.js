import Ember from 'ember';

export default Ember.Component.extend({

	classNames: [
		'content',
		'markdown-content',
	],

	markedOptions: {
		breaks:      true,
		smartLists:  true,
		smartypants: true,
		renderer:    this.getMarkedRenderer,
		highlight:   this.highlightCode,
	},

	getMarkedRenderer() {

		const renderer = new window.marked.Renderer();

		renderer.listitem = ( text ) => {

			if ( ! /^\s*\[[x ]\]\s*/.test( text ) ) {

				return `<li>${text}</li>`;
			} else {

				text = text.replace(
					/^\s*\[ \]\s*/,
					'<i class="fa fa-square-o"></i> '
				).replace(
					/^\s*\[x\]\s*/,
					'<i class="fa fa-check-square-o"></i> '
				);

				return `<li style="list-style: none">${text}</li>`;
			}
		};
	},

	highlightCode( code, lang, callback ) {

		// callback( null, Prism.highlight( code, Prism.languages[ lang ] ) );

		window.hljs.configure({
			tabReplace: '    ', // 4 spaces
			languages:  [
				'bash',
				'css',
				'coffee',
				'html',
				'handlebars',
				'javascript',
				'json',
				'less',
				'markdown',
				'php',
				'ruby',
				'scss',
				'swift',
				'twig',
			],
		});

		callback( null, window.hljs.highlightAuto( code ).value );
	},

	renderedContent: Ember.computed( 'content', () => {

		const source = this.get( 'content' ) || '';

		window.marked.setOptions( this.markedOptions );

		return new Ember.Handlebars.SafeString(
			window.marked( source, ( error, content ) => {

				if ( error ) {
					console.log( `Marked Error: ${error}` );
				}

				return content;
			})
		);
	}),

});
