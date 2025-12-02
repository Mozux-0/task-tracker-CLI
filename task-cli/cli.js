#!/usr/bin/env node

const generalCommands = [ '-h', '--help', '-V', '--version', '-cl', '--commandlist' ]
const cliCommands = [ 'add', 'update', 'delete' ]

const input = process.argv[2]

if (input.includes(generalCommands[2]) || input.includes(generalCommands[3])) {
  console.log('task-cli v1.0.0');
  process.exit(0);
};

if (input.includes(generalCommands[0]) || input.includes(generalCommands[1])) {
  console.log(`
    Usage: task-cli [command]

    A CLI application built manually

    Options:
      -V, --version           output the version number
      -h, --help              display help for command
      -cl, --commandlist      display the list of commands
  `);
  process.exit(0);
};

if (input.includes(generalCommands[4]) || input.includes(generalCommands[5])) {
  console.log(`
    Commands:
      add <task>     add a new task
      update <ID>    update an existing task
      delete <ID>    delete a task
  `);
  process.exit(0);
};

const item = process.argv[3]

switch (input) {
  case 'add':
    console.log(`Task ${ item } is successfully added. ID: 1`);
    process.exit(0);
  case 'update':
    console.log(`Task ID is successfully updated`);
    process.exit(0);
  case 'delete':
    console.log(`Task ID is successfully deleted`);
    process.exit(0);
  default:
    console.log("Invalid command. Use -cl or --commandlist to see the valid commands.");
    process.exit(1);
};