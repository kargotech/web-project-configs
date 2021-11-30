const ruleComposer = require('eslint-rule-composer');
const eslint = require('eslint');

const originalNoUnreachableRule = new eslint.Linter().getRules().get('no-unreachable');
originalNoUnreachableRule.meta.fixable = true;
originalNoUnreachableRule.meta.messages = {
  ...(originalNoUnreachableRule.meta.messages || {}),
}

module.exports = ruleComposer.mapReports(
  originalNoUnreachableRule,
  (problem, context) => {
    problem.fix = fixer => {
      return fixer.remove(problem.node);
    }

    return problem;
  }
);
