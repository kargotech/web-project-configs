const ruleComposer = require('eslint-rule-composer');
const eslint = require('eslint');

const originalNoUnreachableRule = new eslint.Linter().getRules().get('no-unused-vars');
originalNoUnreachableRule.meta.fixable = true;
originalNoUnreachableRule.meta.messages = {
  ...(originalNoUnreachableRule.meta.messages || {}),
}

const sideEffectFree = new Set(["Literal", "ThisExpression"]);

function hasSideEffect(node) {
  if (sideEffectFree.has(node.type)) {
    return false;
  }

  if (node.type === "MemberExpression") {
    return hasSideEffect(node.object) || hasSideEffect(node.property);
  }

  if (node.type === "TemplateLiteral") {
    return node.expressions.length !== 0;
  }

  return true;
}

module.exports = ruleComposer.mapReports(
  originalNoUnreachableRule,
  (problem, context) => {
    const { sourceCode } = context;

    problem.fix = fixer => {
      const { node } = problem;
      const { parent } = node;

      if (!parent) {
        return null;
      }

      const grand = parent.parent;

      switch (parent.type) {
        case "VariableDeclarator":
          if (!grand) {
            return null;
          }

          if (grand.declarations.length === 1) {
            return fixer.remove(grand);
          }

          if (parent !== grand.declarations[grand.declarations.length - 1]) {
            const comma = sourceCode.getTokenAfter(parent, commaFilter);

            return [fixer.remove(parent), fixer.remove(comma)];
          }

          return [
            fixer.remove(sourceCode.getTokenBefore(parent, commaFilter)),
            fixer.remove(parent)
          ];
      }

      return null;
    }

    return problem;
  }
);
