# TMS Configs

TMS configs extends [airbnb](https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb) for the basic javascript linter.

## Rules

**`import/prefer-default-export`**
| Airbnb | Ours | Proposed |
|-|-|-|
| `error` | `warn` | following airbnb |

**`import/no-extraneous-dependencies`**
| Airbnb | Ours | Proposed |
|-|-|-|
| `error` except for [some patterns](https://github.com/airbnb/javascript/blob/master/packages/eslint-config-airbnb-base/rules/imports.js#L71-L97) | `warn` | same with airbnb, with addition of storybook files |

**`class-methods-use-this`**
| Airbnb | Ours | Proposed |
|-|-|-|
| `error` | `warn` | `warn` |

**`no-restricted-syntax`**
| Airbnb | Ours | Proposed |
|-|-|-|
| `error` for [some syntax](https://github.com/airbnb/javascript/blob/master/packages/eslint-config-airbnb-base/rules/style.js#L339-L357) | `warn` | following airbnb |

**`no-use-before-define`**
| Airbnb | Ours | Proposed |
|-|-|-|
| `error` | `warn` | following airbnb |

**`no-param-reassign`**
| Airbnb | Ours | Proposed |
|-|-|-|
| - | `warn` | `error` |

**`no-console`**
| Airbnb | Ours | Proposed |
|-|-|-|
| `warn` | `error` | `error` |

**`no-useless-escape`**
| Airbnb | Ours | Proposed |
|-|-|-|
| - | `warn` | `error` |

**`new-cap`**
| Airbnb | Ours | Proposed |
|-|-|-|
| `error` for [specific condition](https://github.com/airbnb/javascript/blob/master/packages/eslint-config-airbnb-base/rules/style.js#L253-L258) | `off` | following airbnb |

**`func-names`**
| Airbnb | Ours | Proposed |
|-|-|-|
| `warn` | `off` | following airbnb |

**`function-paren-newline`**
| Airbnb | Ours | Proposed |
|-|-|-|
| `error` if inconsistent | same with airbnb | following airbnb |

**`prefer-spread`**
| Airbnb | Ours | Proposed |
|-|-|-|
| `error` | `warn` | following airbnb |

**`space-before-function-paren`**
| Airbnb | Ours | Proposed |
|-|-|-|
| - | `warn` | disallow space after named function and force to add space after other function type |

**`comma-dangle`**
| Airbnb | Ours | Proposed |
|-|-|-|
| `error` for [some comditions](https://github.com/airbnb/javascript/blob/master/packages/eslint-config-airbnb-base/rules/style.js#L42-L48) | `warn` | following airbnb |

**`strict`**
| Airbnb | Ours | Proposed |
|-|-|-|
| `error` if we add strict mode | `off` | following airbnb, because babel will add `use strict` for us and we will always use babel to transpile our codes  |

**`max-len`**
| Airbnb | Ours | Proposed |
|-|-|-|
| `error` with limit of 100 chars excepts for URLs, regex literals, strings, and template literals | `warn` with limit of 120 chars | following airbnb. [More about 100 chars](https://kargox.atlassian.net/wiki/spaces/ENG/pages/11572028/80-100+characters+limit) |

**`quotes`**
| Airbnb | Ours | Proposed |
|-|-|-|
| `error`, force strings to use single quotes | `error`, force strings to use single quotes | following airbnb |

**`object-curly-newline`**
| Airbnb | Ours | Proposed |
|-|-|-|
| `error` for [some conditions](https://github.com/airbnb/javascript/blob/master/packages/eslint-config-airbnb-base/rules/style.js#L401-L406) | `error` if inconsistent | following airbnb |

**`arrow-parens`**
| Airbnb | Ours | Proposed |
|-|-|-|
| `error`, always require parens | `error`, require parens as needed | following airbnb, for the sake of consistency |

**`prefer-arrow-callback`**
| Airbnb | Ours | Proposed |
|-|-|-|
| `error`, with default config as eslintconfig has | `warn` | following airbnb |

***

# ESD Configs

ESD configs extend eslint:recommended which we are not going to extend to, since we prefer airbnb.

***

# Internal Frontend

TMS configs extend [airbnb](https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb) for the basic javascript linter.

Most of rules on this project are similar to TMS.

## Rules

**`indent`**
| Airbnb | Ours | Proposed |
|-|-|-|
| `error` for [some conditions](https://github.com/airbnb/javascript/blob/master/packages/eslint-config-airbnb-base/rules/style.js#L130-L153) | `warn` | following airbnb |

***

# Shipper Frontend

Shipper Frontend configs extend [airbnb](https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb) for the basic javascript linter.

Most of rules on this project are similar to TMS.

***

# Commercial

Commercial configs extend [airbnb](https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb) for the basic javascript linter.

Most of rules on this project are similar to TMS.
