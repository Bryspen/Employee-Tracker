import express from 'express';
import { connectToDb } from './connection.js';
import inquirer from 'inquirer';
import {
    viewAllDepartments,
    viewAllRoles,
    viewAllEmployees,
    addDepartment,
    addRole,
    addEmployee,
    updateEmployeeRole,
    appQuit,
} from './queries.js';

await connectToDb();

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const mainMenu = async () => {
    const choices = [
        'View All Departments',
        'View All Roles',
        'View All Employees',
        'Add Department',
        'Add Role',
        'Add Employee',
        'Update Employee Role',
        'Quit'
    ];

    const { action } = await inquirer.prompt([
        {
            type: 'list',
            name: 'action',
            message: 'What would you like to do?',
            choices
        }
    ]);

    switch (action) {
        case 'View All Departments':
            await viewAllDepartments();
            break;
        case 'View All Roles':
            await viewAllRoles();
            break;
        case 'View All Employees':
            await viewAllEmployees();
            break;
        case 'Add Department':
            await addDepartment();
            break;
        case 'Add Role':
            await addRole();
            break;
        case 'Add Employee':
            await addEmployee();
            break;
        case 'Update Employee Role':
            await updateEmployeeRole();
            break;
        case 'Quit':
            await appQuit();
            return;
    }

    // Loop back to the main menu
    await mainMenu();
};

const appStart = async () => {
    console.log('Welcome to the Employee Management System');
    await mainMenu();
};

await appStart();

app.use((_req, res) => {
    res.status(404).end();
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

export { appStart };