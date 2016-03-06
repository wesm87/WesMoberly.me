`import Ember from 'ember'`

MarkdownContentComponent = Ember.Component.extend(

	classNames: [
		'content'
		'markdown-content'
	]

	markedOptions:
		breaks:      true
		smartLists:  true
		smartypants: true

		renderer: this.getMarkedRenderer

		highlight: this.highlightCode


	getMarkedRenderer: ->

		renderer = new marked.Renderer()

		renderer.listitem = ( text ) ->
			if /^\s*\[[x ]\]\s*/.test( text )
				text = text
					.replace /^\s*\[ \]\s*/, '<i class="fa fa-square-o"></i> '
					.replace /^\s*\[x\]\s*/, '<i class="fa fa-check-square-o"></i> '
				return "<li style='list-style: none'> #{text} </li>"
			else
				return "<li> #{text} </li>"

		return renderer

	highlightCode: ( code ) ->

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
		codeHighlightLinnums( code, hljs: window.hljs, start: 1 )

	renderedContent: Ember.computed 'content', ->

		source = this.get( 'content' ) || ''

		marked.setOptions( @markedOptions )

		return new Ember.Handlebars.SafeString( marked( source ) )

)

`export default MarkdownContentComponent`
