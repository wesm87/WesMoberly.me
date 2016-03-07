`import { test, moduleForComponent } from 'ember-qunit'`
`import hbs from 'htmlbars-inline-precompile'`

moduleForComponent 'auth/login-form', 'Integration | Component | auth/login form', {
	integration: true
}

test 'it renders', (assert) ->
	assert.expect 2

	assert.equal true, true
	assert.equal true, true

	# Set any properties with @set 'myProperty', 'value'
	# Handle any actions with @on 'myAction', (val) ->

	# @render hbs """{{auth.login-form}}"""
	#
	# assert.equal @$().text().trim(), ''
	#
	# # Template block usage:
	# @render hbs """
	# 	{{#auth.login-form}}
	# 		template block text
	# 	{{/auth.login-form}}
	# """
	#
	# assert.equal @$().text().trim(), 'template block text'
