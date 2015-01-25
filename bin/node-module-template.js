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
  .option('--dev', 'create a dev package')
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
    moduleMain: moduleName + '.js',
    moduleTitle: titleCase(moduleName),
    moduleVariable: camelCase(moduleName),
    moduleSentence: sentenceCase(moduleName),
    name: name,
    email: email,
    author: author,
    url: url,
    dev: program.dev,
    description: '',
    username: username,
    license: license,
    licenseName: licenseName,
    moduleGit: 'git://github.com/' + username + '/' + moduleName + '.git',
    moduleSsh: 'git@github.com:' + username + '/' + moduleName + '.git',
    moduleHomepage: 'https://github.com/' + username + '/' + moduleName
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
    writeFile(opts.moduleMain, '');
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

  log(chalk.green('Module created!'));
  log();

  log('1. Remove unnecessary files');
  log(
    '2. Update %s and %s description and keywords',
    chalk.magenta('package.json'),
    chalk.magenta('bower.json')
  );
  log(
    '3. Remove unnecessary dependencies and %s',
    chalk.yellow('npm install')
  );
  log('4. Add test cases');
  log('5. Edit %s to pass tests', chalk.magenta(opts.moduleMain));
  log('6. Repeat %s until complete', chalk.bold('step 3'));
  log('7. Update %s', chalk.magenta('README.md'));
  log('8. Update %s with year and name', chalk.magenta('LICENSE'));
  log(
    '9. %s',
    chalk.yellow('git init && git add . && git commit -a -m "initial commit"')
  );
  log('10. %s', chalk.yellow('mversion patch -m'));
  log('11. Create %s on Github', chalk.dim(opts.moduleName));
  log(
    '12. %s',
    chalk.yellow(
      'git remote add origin ' + opts.moduleSsh +
      ' && git push -u origin master'
    )
  );
  log(
    '13. Go to https://travis-ci.org/ and http://coveralls.io/ to enable repos'
  );
  log('14. %s', chalk.yellow('git push --tags'));
  log(
    '15. Run %s and %s',
    chalk.yellow('npm publish'),
    chalk.yellow('bower register ' + opts.moduleName + ' ' + opts.moduleGit)
  );
  log();
}

/**
 * Log strings to the terminal.
 */
function log () {
  console.log(format.apply(null, arguments));
}
