/*
  semgrep-clojure

  Extends the standard clojure grammar with semgrep pattern constructs.
*/

const base_grammar = require('tree-sitter-clojure/grammar');

module.exports = grammar(base_grammar, {
  name: 'clojure',

  conflicts: ($, previous) => previous.concat([
  ]),

  /*
     Support for semgrep ellipsis ('...') and metavariables ('$FOO'),
     if they're not already part of the base grammar.
  */
  rules: {
    semgrep_deep_expression: $ => seq(
      token(prec(100, '<...')),
      repeat($._gap),
      $._form,
      repeat($._gap),
      token(prec(100, '...>'))
    ),

    _form: ($, previous) => choice(
      $.semgrep_deep_expression,
      ...previous.members
    ),


  /*
    semgrep_ellipsis: $ => '...',

    _expression: ($, previous) => choice(
      $.semgrep_ellipsis,
      ...previous.members
    ),
  */
  }
});
