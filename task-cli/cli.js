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

const arg1 = process.argv[3]
const arg2 = process.argv[4]
const filePath = path.join(__dirname, 'tasks.json')

const data = fs.readFileSync(filePath, 'utf-8')
let arr = JSON.parse(data)

switch (input) {
  case 'add':
    const itemName = arg1;

    if (!itemName) { 
      console.log("Invalid item. Use the following command: task-cli add <task>");
      process.exit(1);
    };

    arr.count += 1;
    const currId = arr.count;

    arr.items.push({ id: currId, description: itemName, status: "todo" });
    fs.writeFileSync(filePath, JSON.stringify(arr, null, 2), 'utf-8');

    console.log(`${ itemName } successfully added to the list with id ${ currId }`);

    process.exit(0);
  case 'update':
    if (!arg2) {
      console.log("Invalid description. Use the following command: task-cli update <id> <new description>");
    };

    const chosenId = Number(arg1), currSum = arr.count, newDescription = arg2;

    if (chosenId > currSum || chosenId <= 0) {
      console.log(`Invalid ID number. Please enter an ID below ${ currCount }`);
      process.exit(1);
    };

    const exist = arr.items.some(obj => obj.id === chosenId);

    if (!exist) {
      console.log(`Task ${ chosenId } is not found, please input a valid id`);
      process.exit(1);
    }

    arr.items[chosenId - 1].description = newDescription;
    fs.writeFileSync(filePath, JSON.stringify(arr, null, 2), 'utf-8');

    console.log(`Task ${ chosenId } has successfully been updated to ${ newDescription }`);
    process.exit(0);
  case 'delete':
    console.log(`Task ID is successfully deleted`);
    process.exit(0);
  default:
    console.log("Invalid command. Use -cl or --commandlist to see the valid commands.");
    process.exit(1);
};