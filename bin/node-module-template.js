#!/usr/bin/env node

var chalk = require('chalk');
var program = require('commander');
var licenses = require('osi-licenses');
var licenseFiles = require('osi-licenses-full');
var githubUsername = require('github-username');
var paramCase = require('param-case');
var titleCase = require('title-case');
var camelCase = require('camel-case');
var sentenceCase = require('sentence-case');
var fs = require('fs');
var join = require('path').join;
var format = require('util').format;
var Handlebars = require('handlebars');
var rimraf = require('rimraf');
var somebody = require('somebody');
var pkg = require('../package.json');

// Set the basic author information.
var author = somebody.stringify({
  name: require('git-user-name'),
  email: require('git-user-email')
});

// Program commands.
program
  .version(pkg.version)
  .description(pkg.description)
  .option('-a, --author [value]', 'set the author [' + author + ']', author)
  .option('-l, --license [value]', 'set the module license [MIT]', 'MIT')
  .parse(process.argv);

// Exit when no arguments.
if (!program.args.length) {
  program.help();
  process.exit();
}

var license = program.license;

// Exit on unknown license.
if (!licenses.hasOwnProperty(license)) {
  log();
  log('Unknown license, use one of:');
  log();
  log(Object.keys(licenses).join(', '));

  process.exit();
}

// Parse a passed in author.
var info = somebody.parse(process.author || author);

if (!info.name || !info.email) {
  log();
  log(
    'Unable to get author name and email, run with %s option',
    chalk.bold('--author')
  );
  log();
  process.exit();
}

var name = info.name;
var email = info.email;
var url = info.url;

var moduleName = paramCase(program.args[0]);
var moduleTitle = titleCase(moduleName);
var moduleVariable = camelCase(moduleName);
var moduleSentence = sentenceCase(moduleName);

var licenseName = licenses[license];

log();
log('Using name: %s', chalk.bold(name));
log('Using email: %s', chalk.bold(email));
log('Using license: %s', chalk.bold(licenseName));
log('Using module name: %s', chalk.bold(moduleName));

log();
log(chalk.dim('Searching for GitHub username...'));
log();

githubUsername(email, function (err, username) {
  if (err) {
    log(chalk.red('Unable to find GitHub username for %s'), email);
    process.exit();
  }

  log('Using username: %s', chalk.bold(username));

  return createModule(join(process.cwd(), moduleName), {
    moduleName: moduleName,
    moduleTitle: moduleTitle,
    moduleVariable: moduleVariable,
    name: name,
    email: email,
    author: author,
    url: url,
    description: moduleSentence,
    username: username,
    license: license,
    licenseName: licenseName
  });
});

/**
 * Create a module folder.
 *
 * @param {String} destDir
 * @param {Object} opts
 */
function createModule (destDir, opts) {
  var srcDir = join(__dirname, '../src');

  log();
  log(chalk.dim('Creating module...'));
  log();

  /**
   * Create a file in the destination directory.
   *
   * @param {String} filename
   */
  function createFile (filename) {
    var srcFile  = join(srcDir, filename);
    var destFile = join(destDir, filename);
    var contents = fs.readFileSync(srcFile, 'utf8');
    var template = Handlebars.compile(contents);

    fs.writeFileSync(destFile, template(opts));
  }

  // Create the destination directory.
  fs.mkdirSync(destDir);

  try {
    // Copy files into destination directory.
    fs.readdirSync(srcDir).forEach(createFile);

    // Write dynamic files manually.
    fs.writeFileSync(join(destDir, opts.moduleName + '.js'), '');
    fs.writeFileSync(join(destDir, 'LICENSE'), licenseFiles[license]);
  } catch (e) {
    // Remove if an error occurs.
    rimraf.sync(destDir);

    // Rethrow errors.
    throw e;
  }
}

/**
 * Log strings to the terminal.
 */
function log () {
  console.log(format.apply(null, arguments));
}
