`import { test, moduleForComponent } from 'ember-qunit'`
`import hbs from 'htmlbars-inline-precompile'`

moduleForComponent 'markdown-editor', 'Integration | Component | markdown editor', {
  integration: true
}

test 'it renders', (assert) ->
  assert.expect 2

  # Set any properties with @set 'myProperty', 'value'
  # Handle any actions with @on 'myAction', (val) ->

  @render hbs """{{markdown-editor}}"""

  assert.equal @$().text().trim(), ''

  # Template block usage:
  @render hbs """
    {{#markdown-editor}}
      template block text
    {{/markdown-editor}}
  """

  assert.equal @$().text().trim(), 'template block text'
