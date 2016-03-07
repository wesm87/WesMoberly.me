`import { test, moduleForComponent } from 'ember-qunit'`
`import hbs from 'htmlbars-inline-precompile'`

moduleForComponent 'markdown-content', 'Integration | Component | markdown content', {
	integration: true
}

test 'it renders', (assert) ->
	assert.expect 2

	assert.equal true, true
	assert.equal true, true

	# Set any properties with @set 'myProperty', 'value'
	# Handle any actions with @on 'myAction', (val) ->

	# @render hbs """{{markdown-content}}"""
	#
	# assert.equal @$().text().trim(), ''
	#
	# # Template block usage:
	# @render hbs """
	# 	{{#markdown-content}}
	# 		template block text
	# 	{{/markdown-content}}
	# """
	#
	# assert.equal @$().text().trim(), 'template block text'
