const noUnreachableFix = require('./rules/no-unreachable-fix');
const noUnusedVarsFix = require('./rules/no-unused-vars-fix');
const noUselessBoolean = require('./rules/no-useless-boolean');

module.exports = {
  rules: {
    'no-unreachable-fix': noUnreachableFix,
    'no-unused-vars-fix': noUnusedVarsFix,
    'no-useless-boolean': noUselessBoolean,
  }
}
