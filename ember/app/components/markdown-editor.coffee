`import Ember from 'ember'`

MarkdownEditorComponent = Ember.Component.extend(

	editor: undefined

	classNames: [
		'content-editor'
		'markdown-editor'
	]

	didInsertElement: ->

		this._super( arguments... )

		@editor = new SimpleMDE(

			element:      this.$( 'textarea' )[0]

			tabSize:      4
			autofocus:    true
			spellChecker: false

			renderingConfig:
				codeSyntaxHighlighting: true

			shortcuts:
				toggleSideBySide: 'Cmd-Alt-Enter'

			toolbar: [
				'bold'
				'italic'
				'heading'
				'clean-block'
				'|'
				'code'
				'quote'
				'unordered-list'
				'ordered-list'
				{
					name: 'check-list'
					title: 'Check List'
					className: 'fa fa-check-square-o'
					action: ( editor ) ->
						SimpleMDE.toggleUnorderedList( editor )
				}
				'|'
				'link'
				'image'
				'table'
				'horizontal-rule'
				'|'
				'preview'
				'side-by-side'
				'fullscreen'
				'|'
				'guide'
			]

			previewRender: ( text ) ->

				renderer = new marked.Renderer()

				renderer.listitem = ( text ) ->
					if /^\s*\[[x ]\]\s*/.test( text )
						text = text
							.replace /^\s*\[ \]\s*/, '<i class="fa fa-square-o"></i> '
							.replace /^\s*\[x\]\s*/, '<i class="fa fa-check-square-o"></i> '
						return "<li style='list-style: none;'> #{text} </li>"
					else
						return "<li> #{text} </li>"

				marked.setOptions(

					breaks:      true
					smartLists:  true
					smartypants: true

					renderer: renderer

					highlight: ( code ) ->
						hljs.configure(
							tabReplace: '    ' # 4 spaces
							languages:  [
								'bash'
								'css'
								'coffee'
								'html'
								'handlebars'
								'javascript'
								'json'
								'less'
								'markdown'
								'php'
								'ruby'
								'scss'
								'swift'
								'twig'
							]
						)
						hljs.highlightAuto( code ).value

				)

				return marked( text )

		)

		@editor.codemirror.on 'change', =>
			this.set 'content', @editor.value()

)

`export default MarkdownEditorComponent`
