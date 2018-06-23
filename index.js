#!/usr/bin/env node
const chalk = require('chalk');
const commander = require('commander');
const figlet = require('figlet');
const fs = require('fs');
const inquirer = require('inquirer');
const Listr = require('listr');
const pkgJson = require('./package.json');

commander
  .version(pkgJson.version, '-v, --version')
  .option('-i, --init', 'Prompt Based Configuration')
  // Default file option
  //.option('-f, --file [path]', 'point the file you would like to read.', './package.json')
  .option('-f, --file [path]', 'point the file you would like to read.')
  .parse(process.argv);

const print = () => {
  console.log(
    chalk.yellow(
      figlet.textSync(pkgJson.name, { horizontalLayout: 'full' }),
    ),
  );
};

const selectOpts = () => {
  const questions = [
    {
      type: 'checkbox',
      name: 'env',
      message: 'Select the environment:',
      choices: ['Dev', 'QA', 'Prod'],
      default: ['Dev'],
    },
  ];
  return inquirer.prompt(questions);
};

const answers = async () => {
  answer = await selectOpts();
  console.log(answer.env);
};

// Print banner, begin opts
print();

// If no options provided, print help
if (!process.argv.slice(2).length) {
  commander.outputHelp();
}

if (commander.init) {
  answers();
}

if (commander.file) {
  new Listr([
    {
      title: `Read ${commander.file}`,
      task: () => fs.readFileSync(commander.file, 'utf-8'),
    },
  ]).run();
}
