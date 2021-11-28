const helper = {
  isBlockStatement(params) {
    return params === 'BlockStatement';
  },
  isIfStatement(params) {
    return params === 'IfStatement';
  },
  isLiteral(params) {
    return params === 'Literal';
  },
  isTrue(params) {
    return params === true;
  },
  isFalse(params) {
    return params === false;
  },
  isBoolean(params) {
    return this.isFalse(params) || this.isTrue(params);
  },
  isOr(params) {
    return params === '||';
  },
  isAnd(params) {
    return params === '&&';
  },
};

module.exports = {
  meta: {
    fixable: 'code',
    messages: {
      default: 'Useless boolean condition',
    },
  },
  create(context) {
    return {
      ConditionalExpression(node) {
        // true ? <consequent> : <alternate>
        if (helper.isLiteral(node.test.type) && helper.isTrue(node.test.value)) {
          context.report({
            node,
            messageId: 'default',
            fix(fixer) {
              return [
                fixer.removeRange([
                  node.range[0],
                  node.consequent.range[0],
                ]),
                fixer.removeRange([
                  node.consequent.range[1],
                  node.range[1],
                ]),
              ]
            },
          });
        }

        // false ? <consequent> : <alternate>
        if (helper.isLiteral(node.test.type) && helper.isFalse(node.test.value)) {
          context.report({
            node,
            messageId: 'default',
            fix(fixer) {
              return fixer.removeRange([
                node.range[0],
                node.alternate.range[0],
              ]);
            },
          });
        }
      },
      IfStatement(node) {
        // if (false) { <consequent> } <alternate>
        if (helper.isLiteral(node.test.type) && helper.isFalse(node.test.value)) {
          context.report({
            node,
            messageId: 'default',
            fix(fixer) {
              // if (false) { <useless-code> } ...
              if (!node.alternate && !helper.isIfStatement(node.parent.type)) {
                return fixer.remove(node);
              }

              // if (false) {
              //   ...
              // } else {
              //   ...
              // }
              if (node.alternate && helper.isBlockStatement(node.alternate.type) && !helper.isIfStatement(node.parent.type)) {
                return [
                  fixer.removeRange([
                    node.range[0],
                    node.alternate.body[0].range[0],
                  ]),
                  fixer.removeRange([
                    node.alternate.body[node.alternate.body.length - 1].range[1],
                    node.alternate.range[1],
                  ]),
                ];
              }

              // if (false) {
              //   ...
              // } else if (...) {
              //   ...
              // } else {
              //   ...
              // }
              if (node.alternate && helper.isIfStatement(node.alternate.type) && !helper.isIfStatement(node.parent.type)) {
                return fixer.removeRange([
                  node.range[0],
                  node.alternate.range[0],
                ]);
              }

              // if (...) {
              //   ...
              // } else if (false) {
              //   ...
              // } else {
              //   ...
              // }
              if (node.alternate && helper.isIfStatement(node.parent.type)) {
                return fixer.removeRange([
                  node.parent.consequent.range[1],
                  node.consequent.range[1],
                ]);
              }

              // if (...) {
              //   ...
              // } else if (false) {
              //   ...
              // }
              if (!node.alternate && helper.isIfStatement(node.parent.type)) {
                return fixer.removeRange([
                  node.parent.consequent.range[1],
                  node.parent.alternate.range[1],
                ]);
              }
            },
          });
        }

        // if (true) { <consequent> } <alternate>
        if (helper.isLiteral(node.test.type) && helper.isTrue(node.test.value)) {
          context.report({
            node,
            messageId: 'default',
            fix(fixer) {
              // if (true) { ... }
              // ---- or ----
              // if (true) {
              //   ...
              // } else {
              //   ...
              // }
              // ---- or ----
              // if (true) {
              //   ...
              // } else if (...) {
              //   ...
              // } else {
              //   ...
              // }
              if (!helper.isIfStatement(node.parent.type)) {
                return [
                  fixer.removeRange([
                    node.range[0],
                    node.consequent.body[0].range[0],
                  ]),
                  fixer.removeRange([
                    node.consequent.body[node.consequent.body.length - 1].range[1],
                    node.range[1],
                  ]),
                ];
              }

              // if (...) {
              //   ...
              // } else if (true) {
              //   ...
              // } else {
              //   ...
              // }
              if (node.alternate && helper.isIfStatement(node.parent.type)) {
                return [
                  fixer.removeRange([
                    node.parent.alternate.range[0],
                    node.parent.alternate.consequent.range[0],
                  ]),
                  fixer.removeRange([
                    node.consequent.range[1],
                    node.range[1],
                  ]),
                ];
              }

              // if (...) {
              //   ...
              // } else if (false) {
              //   ...
              // }
              if (!node.alternate && helper.isIfStatement(node.parent.type)) {
                return fixer.removeRange([
                  node.parent.alternate.range[0],
                  node.parent.alternate.consequent.range[0],
                ]);
              }
            },
          });
        }
      },
      LogicalExpression(node) {
        if (
          // true && <other-logical-expression>
          (helper.isLiteral(node.left.type) && helper.isTrue(node.left.value) && helper.isAnd(node.operator))
          // <true|false> || <other-logical-expression>
          || (helper.isLiteral(node.left.type) && helper.isBoolean(node.left.value) && helper.isOr(node.operator))
        ) {
          context.report({
            node,
            messageId: 'default',
            loc: {
              end: node.right.loc.start,
              start: node.left.loc.start,
            },
            fix(fixer) {
              return fixer.removeRange([node.left.range[0], node.right.range[0]]);
            },
          });
        }

        if (
          // <other-logical-expression> && true
          (helper.isLiteral(node.right.type) && helper.isTrue(node.right.value) && helper.isAnd(node.operator))
          // <other-logical-expression> || <true|false>
          || (helper.isLiteral(node.right.type) && helper.isBoolean(node.right.value) && helper.isOr(node.operator))
        ) {
          context.report({
            node,
            messageId: 'default',
            loc: {
              end: node.right.loc.end,
              start: node.left.loc.end,
            },
            fix(fixer) {
              return fixer.removeRange([node.left.range[1], node.right.range[1]]);
            },
          });
        }
      },
    };
  },
};
