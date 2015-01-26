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

// Program commands.
program
  .version(pkg.version)
  .description(pkg.description)
  .option('-a, --author [value]', 'set the author information')
  .option('-l, --license [value]', 'set the module license [MIT]', 'MIT')
  .option('-u, --username [value]', 'set the repository github username')
  .option('-r, --repo [value]', 'set the module repository name on github')
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

// Set the author string.
var author = program.author || somebody.stringify({
  name: require('git-user-name'),
  email: require('git-user-email')
});

if (!author) {
  log(
    'Unable to get author name and email, run with %s option',
    chalk.bold('--author')
  );
  log();

  process.exit();
}

var moduleName = paramCase(program.args[0]);
var email = somebody.parse(author).email;
var licenseName = licenses[license];
var username = program.username;
var repoName = program.repo || moduleName;

if (!username && !email) {
  log(
    'Unable to find GitHub username, run with %s option',
    chalk.bold('--username')
  );
  log();

  process.exit();
}


log('Using author: %s', chalk.bold(author));
log('Using license: %s', chalk.bold(licenseName));
log('Using module name: %s', chalk.bold(moduleName));
log('Using repository name: %s', chalk.bold(repoName));

// Use passed in username, or search GitHub for your email.
if (!username) {
  log();
  log(chalk.dim('Searching GitHub usernames for "%s"...'), email);
  log();

  githubUsername(email, function (err, username) {
    if (err) {
      log(chalk.red('Unable to find GitHub username for "%s"'), email);
      log();

      return;
    }

    return createModuleWithUsername(username);
  });
} else {
  createModuleWithUsername(username);
}

/**
 * Create a module for username.
 *
 * @param {String} username
 */
function createModuleWithUsername (username) {
  log('Using username: %s', chalk.bold(username));
  log();

  return createModule(join(process.cwd(), repoName), {
    moduleName: moduleName,
    moduleMain: moduleName + '.js',
    moduleTitle: titleCase(moduleName),
    moduleVariable: camelCase(moduleName),
    moduleSentence: sentenceCase(moduleName),
    author: author,
    repoName: repoName,
    dev: program.dev,
    description: '',
    username: username,
    license: license,
    licenseName: licenseName,
    moduleGit: format('git://github.com/%s/%s.git', username, repoName),
    moduleSsh: format('git@github.com:%s/%s.git', username, repoName),
    moduleHomepage: format('https://github.com/%s/%s', username, repoName)
  });
}

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

  log('1. %s', chalk.yellow('cd ' + destDir));
  log('2. Remove unnecessary files');
  log(
    '3. Update %s and %s description and keywords',
    chalk.magenta('package.json'),
    chalk.magenta('bower.json')
  );
  log(
    '4. Remove unnecessary dependencies and %s',
    chalk.yellow('npm install')
  );
  log('5. Add test cases');
  log('6. Edit %s to pass tests', chalk.magenta(opts.moduleMain));
  log('7. Repeat %s until complete', chalk.bold('step 3'));
  log('8. Update %s', chalk.magenta('README.md'));
  log('9. Update %s with year and name', chalk.magenta('LICENSE'));
  log(
    '10. %s',
    chalk.yellow('git init && git add . && git commit -a -m "initial commit"')
  );
  log('11. %s', chalk.yellow('mversion patch -m'));
  log('12. Create %s on Github', chalk.dim(opts.repoName));
  log(
    '13. %s',
    chalk.yellow(
      'git remote add origin ' + opts.moduleSsh +
      ' && git push -u origin master'
    )
  );
  log(
    '14. Go to %s and %s and enable repo access',
    chalk.dim('https://travis-ci.org/'),
    chalk.dim('http://coveralls.io/')
  );
  log('15. %s', chalk.yellow('git push --tags'));
  log(
    '16. Run %s and %s',
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
