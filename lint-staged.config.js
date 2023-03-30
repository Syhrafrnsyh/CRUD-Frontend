module.exports = {
  // eksekusi type-check pada typescript file
  // '**/*.ts?(x)': () => 'yarn type-check',

  // eksekusi eslint dan prettier pada file yang diedit saja
  '**/*.(ts|tsx|jsx|js)': (filenames) => [
    `yarn eslint --fix ${filenames.join(' ')}`,
    `yarn prettier --write ${filenames.join(' ')}`,
  ],

  // Format MarkDown and JSON
  '**/*.(md|json)': (filenames) =>
    `yarn prettier --write ${filenames.join(' ')}`,
}
