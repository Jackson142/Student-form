#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import inquirer from 'inquirer';

const DATA_FILE = path.join(process.cwd(), 'employees.json');

function loadEmployees() {
  try {
    const raw = fs.readFileSync(DATA_FILE, 'utf8');
    return JSON.parse(raw);
  } catch (e) {
    return [];
  }
}

function saveEmployees(list) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(list, null, 2));
}

async function mainMenu() {
  const choices = ['Add Employee', 'View Employees', 'Update Employee', 'Delete Employee', 'Exit'];

  while (true) {
    const { action } = await inquirer.prompt({
      name: 'action',
      type: 'list',
      message: 'Choose action',
      choices
    });

    let employees = loadEmployees();

    if (action === 'Exit') process.exit(0);
    else if (action === 'Add Employee') {
      const answers = await inquirer.prompt([
        { name: 'id', message: 'ID:', validate: v => v.trim() !== '' },
        { name: 'name', message: 'Name:', validate: v => v.trim() !== '' },
        { name: 'position', message: 'Position:' },
        { name: 'salary', message: 'Salary:', validate: v => !isNaN(v) }
      ]);
      if (employees.find(e => e.id === answers.id)) console.log('Employee with that ID exists.');
      else {
        employees.push({ id: answers.id, name: answers.name, position: answers.position, salary: Number(answers.salary) });
        saveEmployees(employees);
        console.log('Added.');
      }
    } else if (action === 'View Employees') {
      console.table(employees);
    } else if (action === 'Update Employee') {
      const { id } = await inquirer.prompt({ name: 'id', message: 'Enter ID to update:' });
      const idx = employees.findIndex(e => e.id === id);
      if (idx === -1) { console.log('Not found.'); continue; }
      const e = employees[idx];
      const answers = await inquirer.prompt([
        { name: 'name', message: `Name (${e.name}):`, default: e.name },
        { name: 'position', message: `Position (${e.position}):`, default: e.position },
        { name: 'salary', message: `Salary (${e.salary}):`, default: String(e.salary), validate: v => !isNaN(v) }
      ]);
      employees[idx] = { id: e.id, name: answers.name, position: answers.position, salary: Number(answers.salary) };
      saveEmployees(employees);
      console.log('Updated.');
    } else if (action === 'Delete Employee') {
      const { id } = await inquirer.prompt({ name: 'id', message: 'Enter ID to delete:' });
      const idx = employees.findIndex(e => e.id === id);
      if (idx === -1) { console.log('Not found.'); continue; }
      employees.splice(idx, 1);
      saveEmployees(employees);
      console.log('Deleted.');
    }
  }
}

mainMenu();
