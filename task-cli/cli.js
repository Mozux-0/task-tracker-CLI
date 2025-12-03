#!/usr/bin/env node

// packages 

const path = require('path');
const fs = require('fs');

// variables

const generalCommands = [ '-h', '--help', '-V', '--version', '-cl', '--commandlist', '-test' ]

// process

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

function validateId (id, maxCount, arr) {
  if (maxCount == 0) {
    console.log("You have no task, please add a task.");
    process.exit(1);
  };

  if (id > maxCount || id <= 0) {
    console.log(`Invalid ID number. Please enter an ID below or equal to ${ maxCount }`);
    process.exit(1);
  };

  const exist = arr.items.some(obj => obj.id === id);

  if (!exist) {
    console.log(`Task ${ id } is not found, please input a valid id`);
    process.exit(1);
  }
};

const arg1 = process.argv[3]
const arg2 = process.argv[4]
const filePath = path.join(__dirname, 'tasks.json')

const data = fs.readFileSync(filePath, 'utf-8')
let arr = JSON.parse(data)

switch (input) {
  case 'add':
    var itemName = arg1;

    if (!itemName) { 
      console.log("Invalid item. Use the following command: task-cli add <task>");
      process.exit(1);
    };

    arr.count += 1;
    var currId = arr.count;

    arr.items.push({ id: currId, description: itemName, status: "todo" });
    fs.writeFileSync(filePath, JSON.stringify(arr, null, 2), 'utf-8');

    console.log(`${ itemName } successfully added to the list with id ${ currId }`);

    process.exit(0);
  case 'update':
    var newDescription = arg2;

    if (!newDescription) {
      console.log("Invalid description. Use the following command: task-cli update <id> <new description>");
    };

    var chosenId = Number(arg1), currSum = arr.count;
    validateId(chosenId, currSum, arr);

    arr.items[chosenId - 1].description = newDescription;
    fs.writeFileSync(filePath, JSON.stringify(arr, null, 2), 'utf-8');

    console.log(`Task ${ chosenId } has successfully been updated to ${ newDescription }`);
    process.exit(0);
  case 'delete':
    var chosenId = Number(arg1), currSum = arr.count;
    validateId(chosenId, currSum, arr);

    arr.items.splice(chosenId - 1, 1);
    arr.items.forEach((item, i) => {
      item.id = i + 1;      
    });

    arr.count = arr.items.length;

    fs.writeFileSync(filePath, JSON.stringify(arr, null, 2), 'utf-8');
  
    console.log(`Task ${ chosenId } is successfully deleted`);
    process.exit(0);
  case 'mark-in-progress':
    var chosenId = Number(arg1), currSum = arr.count;
    validateId(chosenId, currSum, arr);

    arr.items[chosenId - 1].status = 'in-progress';
    fs.writeFileSync(filePath, JSON.stringify(arr, null, 2), 'utf-8');

    console.log(`Task ${ chosenId } has successfully been marked in-progress`);
    process.exit(0);
  case 'mark-done':
      var chosenId = Number(arg1), currSum = arr.count;
      validateId(chosenId, currSum, arr);

      arr.items[chosenId - 1].status = 'done';
      fs.writeFileSync(filePath, JSON.stringify(arr, null, 2), 'utf-8');

      console.log(`Task ${ chosenId } has successfully been marked done`);
      process.exit(0);
  default:
  console.log("Invalid command. Use -cl or --commandlist to see the valid commands.");
  process.exit(1);
};