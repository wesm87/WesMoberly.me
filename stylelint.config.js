// eslint-disable-next-line max-len
const bemRegex = /^_|((u|is|has|js)-([a-z0-9]*[-a-z0-9]*)|([a-z0-9]*[-a-z0-9]*)(__([a-z0-9]*[-a-z0-9]*))?(--([a-z0-9]*[-a-z0-9]*))?)(\\@([a-z0-9]*[-a-z0-9]*))?$/;

module.exports = {
  extends: 'stylelint-config-sass-guidelines',
  plugins: [
    'stylelint-selector-bem-pattern',
  ],
  rules: {
    'selector-class-pattern': bemRegex,
    'scss/at-mixin-pattern': bemRegex,
    'scss/dollar-variable-pattern': bemRegex,
    'max-nesting-depth': [2, {
      ignoreAtRules: [
        'if',
        'for',
        'media',
      ],
    }],
    'declaration-block-properties-order': [
      {
        properties: [
          'content',
        ],
      },
      {
        properties: [
          'float',
          'clear',
          'position',
          'top',
          'right',
          'bottom',
          'left',
          'z-index',
        ],
      },
      {
        properties: [
          'display',
          'visibility',
          'opacity',
          'overflow',
          'clip',
          'cursor',
          'flex',
          'align-items',
          'vertical-align',
          'transform',
          'transition',
        ],
      },
      {
        properties: [
          'width',
          'min-width',
          'max-width',
          'height',
          'min-height',
          'max-height',
        ],
      },
      {
        properties: [
          'padding',
          'padding-top',
          'padding-bottom',
          'padding-left',
          'padding-right',
          'margin',
          'margin-top',
          'margin-bottom',
          'margin-left',
          'margin-right',
        ],
      },
      {
        properties: [
          'columns',
          'column-gap',
          'column-fill',
          'column-rule',
          'column-span',
          'column-count',
          'column-width',
        ],
      },
      {
        properties: [
          'border-collapse',
          'border-spacing',
        ],
      },
      {
        properties: [
          'border',
          'border-top',
          'border-right',
          'border-bottom',
          'border-left',
          'border-width',
          'border-top-width',
          'border-right-width',
          'border-bottom-width',
          'border-left-width',
        ],
      },
      {
        properties: [
          'border-style',
          'border-top-style',
          'border-right-style',
          'border-bottom-style',
          'border-left-style',
        ],
      },
      {
        properties: [
          'border-radius',
          'border-top-left-radius',
          'border-top-right-radius',
          'border-bottom-left-radius',
          'border-bottom-right-radius',
        ],
      },
      {
        properties: [
          'border-color',
          'border-top-color',
          'border-right-color',
          'border-bottom-color',
          'border-left-color',
        ],
      },
      {
        properties: [
          'outline',
          'outline-color',
          'outline-offset',
          'outline-style',
          'outline-width',
          'box-shadow',
        ],
      },
      {
        properties: [
          'fill',
          'color',
          'background',
          'background-color',
          'background-image',
          'background-repeat',
          'background-size',
          'background-clip',
          'background-position',
        ],
      },
      {
        properties: [
          'font',
          'font-family',
          'font-weight',
          'font-style',
          'font-variant',
          'font-smoothing',
          'font-size',
          'line-height',
        ],
      },
      {
        properties: [
          'text-align',
          'text-decoration',
          'text-indent',
          'text-overflow',
          'text-rendering',
          'text-shadow',
          'text-transform',
          'text-wrap',
        ],
      },
      {
        properties: [
          'white-space',
          'word-spacing',
          'letter-spacing',
          'quotes',
        ],
      },
      {
        properties: [
          'caption-side',
          'empty-cells',
          'speak',
          'table-layout',
        ],
      },
    ],
  },
};
