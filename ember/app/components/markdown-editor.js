import Ember from 'ember';

export default Ember.Component.extend({

	editor: undefined,

	classNames: [
		'content-editor',
		'markdown-editor',
	],

	didInsertElement() {

		this._super( ...arguments );

		this.editor = new window.SimpleMDE({

			element:      this.$( 'textarea' )[0],

			tabSize:      4,
			autofocus:    true,
			spellChecker: false,

			renderingConfig: {
				codeSyntaxHighlighting: true,
			},

			shortcuts: {
				toggleSideBySide: 'Cmd-Alt-Enter',
			},

			toolbar: [
				'bold',
				'italic',
				'heading',
				'clean-block',
				'|',
				'code',
				'quote',
				'unordered-list',
				'ordered-list',
				{
					name: 'check-list',
					title: 'Check List',
					className: 'fa fa-check-square-o',
					action( editor ) {
						return window.SimpleMDE.toggleUnorderedList( editor );
					}
				},
				'|',
				'link',
				'image',
				'table',
				'horizontal-rule',
				'|',
				'preview',
				'side-by-side',
				'fullscreen',
				'|',
				'guide',
			],

			previewRender( text ) {

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

				window.marked.setOptions({

					renderer,

					breaks:      true,
					smartLists:  true,
					smartypants: true,

					highlight( code, lang, callback ) {
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

						// window.hljs.highlightAuto( code ).value;
						callback( null, window.hljs.highlightAuto( code ).value );
					}
				});

				return window.marked( text );
			},
		});

		this.editor.codemirror.on( 'change', () => {
			this.set( 'content', this.editor.value() );
		});
	},

});
