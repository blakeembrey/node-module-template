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

// Add whitespace below command line.
log();

// Exit on unknown license.
if (!licenses.hasOwnProperty(license)) {
  log('Unknown license (%s), use one of:', license);
  log();
  log(Object.keys(licenses).join(', '));
  log();

  process.exit();
}

// Parse a passed in author.
var info = somebody.parse(process.author || author);

if (!info.name || !info.email) {
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

log('Using name: %s', chalk.bold(name));
log('Using email: %s', chalk.bold(email));
log('Using license: %s', chalk.bold(licenseName));
log('Using module name: %s', chalk.bold(moduleName));
log();

log(chalk.dim('Searching for GitHub username...'));
log();

// Search GitHub for your username.
githubUsername(email, function (err, username) {
  if (err) {
    log(chalk.red('Unable to find GitHub username for %s'), email);
    log();

    return;
  }

  log('Using username: %s', chalk.bold(username));
  log();

  return createModule(join(process.cwd(), moduleName), {
    moduleName: moduleName,
    moduleTitle: moduleTitle,
    moduleVariable: moduleVariable,
    moduleSentence: moduleSentence,
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

  log(chalk.dim('Creating module...'));
  log();

  /**
   * Write a file to the filesystem.
   *
   * @param {String} destFile
   * @param {String} contens
   */
  function writeFile (basename, contents) {
    var filename = join(destDir, basename);

    log('Writing "%s" to filesystem...', filename);
    fs.writeFileSync(filename, contents);
  }

  /**
   * Create a file in the destination directory.
   *
   * @param {String} filename
   */
  function generateFile (filename) {
    var contents = fs.readFileSync(join(srcDir, filename), 'utf8');
    var template = Handlebars.compile(contents);

    writeFile(filename, template(opts));
  }

  try {
    // Create the destination directory.
    fs.mkdirSync(destDir);
  } catch (e) {
    log(chalk.red('Directory "%s" already exists'), destDir);
    log();

    return;
  }

  try {
    // Copy files into destination directory.
    fs.readdirSync(srcDir).forEach(generateFile);

    // Write dynamic files manually.
    writeFile(opts.moduleName + '.js', '');
    writeFile('LICENSE', licenseFiles[license]);
    log();
  } catch (e) {
    // Remove everything if an error occurs.
    rimraf.sync(destDir);

    // Rethrow errors.
    log(chalk.red(e.message));
    log();

    return;
  }
}

/**
 * Log strings to the terminal.
 */
function log () {
  console.log(format.apply(null, arguments));
}
