const compactFormatter = require('./compact');

const PATH_PREFIX = process.env.LINT_DIR || ''; // Useful for monorepo structure

function removeTrailingPeriod(str) {
  return str[str.length - 1] === '.' ? str.substring(0, str.length - 1) : str;
}

module.exports = function (results) {
  // Generate github action annotation
  console.log('::group::ESLint Annotations');
  const formattedResults = results
    .filter(r => r.messages.length > 0)
    .map(file => {
      const { errorCount, messages, filePath, ...restFileObj } = file;
      console.log(`::set-output name=ERROR_COUNTS::${errorCount}`);

      // Format filepath to remove gh action runner path
      const projectFilePath = PATH_PREFIX + file.filePath.substr(process.cwd().length + 1);
      return {
        ...restFileObj,
        errorCount,
        filePath: projectFilePath,
        messages: messages.map(msg => {
          const { fatal, line, column, message, ruleId, severity } = msg;

          if (fatal) {
            throw Error(`ESLint error: ${message}`);
          }

          console.log(
            `::${
              severity === 1 ? 'warning' : 'error'
            } file=${projectFilePath},line=${line},col=${column}::${removeTrailingPeriod(
              message
            )} (${ruleId})`
          );

          return msg;
        })
      };
    });
  console.log('::endgroup::');

  // Keep the default formatter to run after succesfully generate annotation
  const compactFormatted = compactFormatter(formattedResults);
  return compactFormatted;
};
