import express from 'express';
import { QueryResult } from 'pg';
import { pool, connectToDb } from './connection.js';
import inquirer from 'inquirer'
import {viewAllDepartments,
        viewAllRoles,
        addDepartment,
        addRole,
        addEmployee,
        updateEmployeeRole,
        quit} from './queries.js'

await connectToDb();

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//App Start
function appStart () {
    inquirer
    .prompt ([
        {
        type:'list',
        name:'prompt',
        message: 'What would you like to do?',
                            choices: ['View All Departments',
                                     'View All Roles',
                                     'View All Employees',
                                     'Add a Department',
                                     'Add a Role',
                                     'Add an Employee',
                                     'Update an Employee Role',
                                     'Quit']
        }
    ])
    .then ((answers) => {
        if (answers.prompt === 'View All Departments'){
            viewAllDepartments();
        }
        else if (answers.prompt === 'View All Roles'){
            viewAllRoles();
        }

    }


    }

    appStart()
// app.use((_req, res) => {
//   res.status(404).end();
// });
//
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

export {appStart}