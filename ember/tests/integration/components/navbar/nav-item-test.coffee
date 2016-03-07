`import { test, moduleForComponent } from 'ember-qunit'`
`import hbs from 'htmlbars-inline-precompile'`

moduleForComponent 'navbar/nav-item', 'Integration | Component | navbar/nav item', {
	integration: true
}

test 'it renders', (assert) ->
	assert.expect 2

	assert.equal true, true
	assert.equal true, true

	# Set any properties with @set 'myProperty', 'value'
	# Handle any actions with @on 'myAction', (val) ->

	# @render hbs """{{navbar/nav-item}}"""
	#
	# assert.equal @$().text().trim(), ''
	#
	# # Template block usage:
	# @render hbs """
	# 	{{#navbar/nav-item}}
	# 		template block text
	# 	{{/navbar/nav-item}}
	# """
	#
	# assert.equal @$().text().trim(), 'template block text'
