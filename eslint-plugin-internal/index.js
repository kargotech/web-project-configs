const noUnreachableFix = require('./rules/no-unreachable-fix');
const noUselessBoolean = require('./rules/no-useless-boolean');

module.exports = {
  rules: {
    'no-unreachable-fix': noUnreachableFix,
    'no-useless-boolean': noUselessBoolean,
  }
}
