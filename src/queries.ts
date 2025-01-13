import inquirer from 'inquirer';
import { pool } from './connection.js';
import { QueryResult } from 'pg';
import { appStart } from "./server.js";

const viewAllDepartments = async () => {
    const query = `
        SELECT 
            department.id,
            name 
        FROM department`;
    try {
        const result: QueryResult = await pool.query(query);
        const rows = result.rows;
        const headers = ['ID', 'Name'];
        const headerRow = headers.join('  ');
        const maxLengths = headers.map((header, ) =>
            Math.max(header.length, ...rows.map(row => row[header.toLowerCase()].toString().length))
        );
        const separator = maxLengths.map(length => '-'.repeat(length)).join('  ');
        const dataRows = rows.map(row =>
            headers.map((header, index) => row[header.toLowerCase()].toString().padEnd(maxLengths[index])).join('  ')
        ).join('\n');

        console.log(`${headerRow}\n${separator}\n${dataRows}`);
        await appStart()
    } catch (err) {
        console.error('Error querying departments:', err);
        await appStart();
    }
}

const viewAllRoles = async () => {
    const query = `
        SELECT
            role.id,
            role.title,
            department.name AS department,
            role.salary
        FROM
            role
                INNER JOIN
            department ON role.department_id = department.id`;
    try {
        const result: QueryResult = await pool.query(query);
        console.table(result.rows, ['id', 'title', 'department', 'salary']);
        await appStart()
    } catch (err) {
        console.error('Error querying roles:', err);
        await appStart();
    }
}

const viewAllEmployees = async () => {
    const query = `
  SELECT 
    employee.id,
    employee.first_name, 
    employee.last_name, 
    role.title AS role, 
    department.name AS department, 
    role.salary, 
    CONCAT(manager.first_name, ' ', manager.last_name) AS manager
  FROM 
    employee
  LEFT JOIN 
    role ON employee.role_id = role.id
  LEFT JOIN 
    department ON role.department_id = department.id
  LEFT JOIN 
    employee AS manager ON employee.manager_id = manager.id;
`;
    try {
        const result: QueryResult = await pool.query(query);
        console.table(result.rows, ['id', 'first_name', 'last_name', 'role', 'department', 'salary', 'manager']);
        await appStart()
    } catch (err) {
        console.error('Error querying employees:', err);
        await appStart();
    }
}

const addDepartment = async () => {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'department',
                message: 'Enter the department name:',
                validate: input => input ? true : 'Enter the department name:'
            }
        ])
        .then(async (answer) => {
            const {department} = answer;
            try {
                const insert = await pool.query(`INSERT INTO department (name)
                                                 VALUES ($1)
                                                 RETURNING *`, [department]);
                console.log('Department added successfully:', insert.rows[0].name);
                await appStart()
            } catch (err) {
                console.error('Error adding department:', err);
                await appStart();
            }
        });
}

 const addRole = async () => {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'title',
                message: 'Enter the role title:',
                validate: input => input ? true : 'Enter the role title:'
            },
            {
                type: 'input',
                name: 'salary',
                message: 'Enter the role salary:',
                validate: input => input ? true : 'Enter the role salary:'
            },
            {
                type: 'input',
                name: 'department_id',
                message: 'Enter the department id:',
                validate: input => input ? true : 'Enter the department id:'
            }
        ])
        .then(async (answer) => {
            const {title, salary, department_id} = answer;
            try {
                const insert = await pool.query(`INSERT INTO role (title, salary, department_id)
                                                 VALUES ($1, $2, $3)
                                                 RETURNING *`, [title, salary, department_id]);
                console.log('Role added successfully:', insert.rows[0].title);
                await appStart()
            } catch (err) {
                console.error('Error adding role:', err);
                await appStart();
            }
        });
}

const addEmployee = async () => {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'first_name',
                message: 'Enter the employee first name:',
                validate: input => input ? true : 'Enter the employee first name:'
            },
            {
                type: 'input',
                name: 'last_name',
                message: 'Enter the employee last name:',
                validate: input => input ? true : 'Enter the employee last name:'
            },
            {
                type: 'input',
                name: 'role_id',
                message: 'Enter the role id:',
                validate: input => input ? true : 'Enter the role id:'
            },
            {
                type: 'input',
                name: 'manager_id',
                message: 'Enter the manager id:',
                validate: input => input ? true : 'Enter the manager id:'
            }
        ])
        .then(async (answer) => {
            const {first_name, last_name, role_id, manager_id} = answer;
            try {
                const insert = await pool.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id)
                                                 VALUES ($1, $2, $3, $4)
                                                 RETURNING *`, [first_name, last_name, role_id, manager_id]);
                console.log('Employee added successfully:', insert.rows[0].first_name);
                await appStart()
            } catch (err) {
                console.error('Error adding employee:', err);
                await appStart();
            }
        });
}

 const updateEmployeeRole = async () => {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'employee_id',
                message: 'Enter the employee id:',
                validate: input => input ? true : 'Enter the employee id:'
            },
            {
                type: 'input',
                name: 'role_id',
                message: 'Enter the role id:',
                validate: input => input ? true : 'Enter the role id:'
            }
        ])
        .then(async (answer) => {
            const {employee_id, role_id} = answer;
            try {
                const update = await pool.query(`UPDATE employee
                                                 SET role_id = $1
                                                 WHERE id = $2
                                                 RETURNING *`, [role_id, employee_id]);
                console.log('Employee role updated successfully:', update.rows[0].first_name);
                await appStart()
            } catch (err) {
                console.error('Error updating employee role:', err);
                await appStart();
            }
        });
}

const appQuit = async () => {
    console.log("Exiting the application...");
    process.exit(0);
}

export {viewAllDepartments,
        viewAllRoles,
        viewAllEmployees,
        addDepartment,
        addRole,
        addEmployee,
        updateEmployeeRole,
        appQuit
};