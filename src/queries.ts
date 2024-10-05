import inquirer from 'inquirer';
import { pool } from './connection.js';
import { QueryResult } from 'pg';
import { employeeTracker } from './server.js';
import {query} from "express";

const viewAllDepartments = async () => {
    const query = 'SELECT * FROM departments';
    try {
        const result: QueryResult = await pool.query(query);
        console.table(result.rows);
    } catch (err) {
        console.error('Error querying departments:', err);
        employeeTracker();
    }
}

const viewAllRoles = async () => {
    const query = 'SELECT * FROM roles';
    try {
        const result: QueryResult = await pool.query(query);
        console.table(result.rows);
    } catch (err) {
        console.error('Error querying roles:', err);
        employeeTracker();
    }
}

const viewAllEmployees = async () => {
    const query = 'SELECT * FROM employees';
    try {
        const result: QueryResult = await pool.query(query);
        console.table(result.rows);
    } catch (err) {
        console.error('Error querying employees:', err);
        employeeTracker();
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
            .then(async(answer) => {
                    const { name } = answer;
                    try {
                        const department = await pool.query(`INSERT INTO department (name) VALUES (1$) RETURNING *`, [name]);
                        console.log(`Department added successfully: ${department}`);

                    }
                }


}




export {viewAllDepartments,
        viewAllRoles,
        viewAllEmployees,
        addDepartment,
        addRole,
        addEmployee,
        updateEmployeeRole,
        quit};