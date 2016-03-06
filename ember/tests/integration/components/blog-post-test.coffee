`import { test, moduleForComponent } from 'ember-qunit'`
`import hbs from 'htmlbars-inline-precompile'`

moduleForComponent 'blog-post', 'Integration | Component | blog post', {
  integration: true
}

test 'it renders', (assert) ->
  assert.expect 2

  # Set any properties with @set 'myProperty', 'value'
  # Handle any actions with @on 'myAction', (val) ->

  @render hbs """{{blog-post}}"""

  assert.equal @$().text().trim(), ''

  # Template block usage:
  @render hbs """
    {{#blog-post}}
      template block text
    {{/blog-post}}
  """

  assert.equal @$().text().trim(), 'template block text'
