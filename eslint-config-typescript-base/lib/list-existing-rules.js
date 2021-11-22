const rules = require('@typescript-eslint/eslint-plugin');
const kargorules = require('@kargotech/eslint-config-base');

// Function to extract all rules that we extend from
function getRules(source = {}) {
  const extendedRules = source.extends || [];
  if (extendedRules.length) {
    return extendedRules.reduce((acc, item) => {
      const rulesItem = require(item);

      return {
        ...acc,
        ...(rulesItem.extends ? getRules(rulesItem) : rulesItem.rules),
      };
    }, {});
  }

  return {};
}

module.exports = getRules(kargorules);
