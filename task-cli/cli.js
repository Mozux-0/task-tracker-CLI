#!/usr/bin/env node

// packages 

const path = require('path');
const fs = require('fs');

// variables

const generalCommands = [ '-h', '--help', '-V', '--version', '-cl', '--commandlist', '-test' ]
const cliCommands = [ 'add', 'update', 'delete' ]

// process

const input = process.argv[2]

// delete later, for testing purposes
// if (input.includes(generalCommands[6])) {
//   const filePath = path.join(__dirname, 'tasks.json');

//   const data = fs.readFileSync(filePath, 'utf-8');

//   let arr = JSON.parse(data);

//   arr.push({ name: "kontol" });

//   fs.writeFileSync(filePath, JSON.stringify(arr, 2, null));

//   console.log(arr);

//   // fs.appendFileSync(filePath, JSON.stringify({ name: 'test' }, null, 2),'utf-8');
//   // fs.appendFileSync(filePath, JSON.stringify({ name: 'kontl' }, null, 2),'utf-8');

//   // fs.readFileSync(filePath, 'utf-8', (err, data) => {
//   //   if (err) { console.log(err); };
//   //   console.log('File data:', data);
//   // });
//   process.exit(0);
// };

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

const args = process.argv[3]
const filePath = path.join(__dirname, 'tasks.json')

const data = fs.readFileSync(filePath, 'utf-8')
let arr = JSON.parse(data)

switch (input) {
  case 'add':
    if (!args) { 
      console.log("Invalid item. Use the following command: task-cli add <task>");
      process.exit(1);
    };

    console.log(arr.count);
    arr.count += 1;

    arr.items.push({ id: arr.count, description: args, status: "todo" });
    fs.writeFileSync(filePath, JSON.stringify(arr, null, 2), 'utf-8');

    console.log(`${ args } successfully added to the list with id ${ arr.count }`);

    process.exit(0);
  case 'update':
    if (args > taskCount || args <= 0) {
      console.log(`Invalid ID number, please enter an ID below ${ data.count }`);
      process.exit(1);
    };

    console.log(args);

    const exist = arr.some(obj => obj.id === args);

    if (!exist) {
      console.log(`Task ${ args } is not found, please input a valid id`);
      process.exit(1);
    }

    console.log(`Task ${ args } has successfully been updated`);
    process.exit(0);
  case 'delete':
    console.log(`Task ID is successfully deleted`);
    process.exit(0);
  default:
    console.log("Invalid command. Use -cl or --commandlist to see the valid commands.");
    process.exit(1);
};