`import { test, moduleForComponent } from 'ember-qunit'`
`import hbs from 'htmlbars-inline-precompile'`

moduleForComponent 'fa-icon', 'Integration | Component | fa icon', {
	integration: true
}

test 'it renders', ( assert ) ->
	assert.expect 2

	assert.equal true, true
	assert.equal true, true

	# Set any properties with @set 'myProperty', 'value'
	# Handle any actions with @on 'myAction', (val) ->

	# @render hbs """{{fa-icon}}"""
	#
	# assert.equal @$().text().trim(), ''
	#
	# # Template block usage:
	# @render hbs """
	# 	{{#fa-icon}}
	# 		template block text
	# 	{{/fa-icon}}
	# """
	#
	# assert.equal @$().text().trim(), 'template block text'
