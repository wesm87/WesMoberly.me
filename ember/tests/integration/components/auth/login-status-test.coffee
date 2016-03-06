`import { test, moduleForComponent } from 'ember-qunit'`
`import hbs from 'htmlbars-inline-precompile'`

moduleForComponent 'auth/login-status', 'Integration | Component | auth/login status', {
  integration: true
}

test 'it renders', (assert) ->
  assert.expect 2

  # Set any properties with @set 'myProperty', 'value'
  # Handle any actions with @on 'myAction', (val) ->

  @render hbs """{{auth/login-status}}"""

  assert.equal @$().text().trim(), ''

  # Template block usage:
  @render hbs """
    {{#auth/login-status}}
      template block text
    {{/auth/login-status}}
  """

  assert.equal @$().text().trim(), 'template block text'
