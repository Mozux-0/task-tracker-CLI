#!/usr/bin/env node

import { Command } from 'commander';

const program = new Command();

program
  .name('my-cli')
  .description('A CLI application built with commander.js')
  .version('1.0.0');

program.parse()