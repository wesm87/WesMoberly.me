`import { test, moduleForComponent } from 'ember-qunit'`
`import hbs from 'htmlbars-inline-precompile'`

moduleForComponent 'navbar/nav-items', 'Integration | Component | navbar/nav items', {
  integration: true
}

test 'it renders', (assert) ->
  assert.expect 2

  # Set any properties with @set 'myProperty', 'value'
  # Handle any actions with @on 'myAction', (val) ->

  @render hbs """{{navbar/nav-items}}"""

  assert.equal @$().text().trim(), ''

  # Template block usage:
  @render hbs """
    {{#navbar/nav-items}}
      template block text
    {{/navbar/nav-items}}
  """

  assert.equal @$().text().trim(), 'template block text'
