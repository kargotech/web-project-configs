// This rule is best combined with the `no-unused-vars` rule.
const ruleComposer = require('eslint-rule-composer');
const eslint = require('eslint');

const originalNoUnreachableRule = new eslint.Linter().getRules().get('no-undef');
originalNoUnreachableRule.meta.fixable = true;
originalNoUnreachableRule.meta.messages = {
  ...(originalNoUnreachableRule.meta.messages || {}),
}

module.exports = ruleComposer.mapReports(
  originalNoUnreachableRule,
  (problem, context) => {
    problem.fix = fixer => {
      return fixer.replaceText(problem.node, 'true');
    }

    return problem;
  }
);
