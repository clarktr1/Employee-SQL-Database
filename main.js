const { error } = require('console');
const inquirer = require('inquirer');
const mysql = require('mysql');
const table = require('console.table');
const { addEmployee } = require('./query-functions.js')

const db = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: 'root',
      database: 'employees_db'
    }, 
  );

const databasePrompt = () => {
inquirer
    .prompt([
    {   type: 'list',
        name: 'action',
        message: 'What would you like to do?',
        choices: ['Add Employee',  'Add Role',  'Add Department', 'Update Employee Role', 'View All Roles','View All Departments', 'Exit' ],
    }
    ])
.then((response) => {
    switch (response.action) {
        case 'Add Employee':
            inquirer
            .prompt([
                {
                    type: 'input',
                    message: 'What is the employee\'s first name?',
                    name: 'first_name',
                    validate: (input) => {
                        if (!input) {
                          return 'Name is required';
                        } else if (!/^[a-z A-Z]+$/.test(input)) {
                            return 'Name should only container letters';
                        } return true
                    },
                },
                {
                    type: 'input',
                    message: 'What is the employee\'s last name?',
                    name: 'last_name',
                    validate: (input) => {
                        if (!input) {
                          return 'Name is required';
                        } else if (!/^[a-z A-Z]+$/.test(input)) {
                            return 'Name should only container letters';
                        } return true
                    },
                },
                {
                    type: 'list',
                    message: 'What is the employee\'s role?',
                    name: 'role',
                    choices: ['Engineering', 'Finance', 'Legal', 'Sales', 'Service']
                },
                {
                    type: 'input',
                    message: 'Who is the employee\'s manager? Leave blank if none.',
                    name: 'manager',
                },
            ])
            .then((response) => {
                addEmployee(response);
            })
            break;
        case 'Add Role':
            inquirer
                .prompt([
                    {
                        type: 'input',
                        name: 'department',
                        message: 'What is the name of the deparment?',
                    },
                    {
                        type: 'input',
                        name: 'role',
                        message: 'What is the role name?',
                    },
                    {
                        type: 'input',
                        name: 'salary',
                        message: 'What is the salary?',
                    },
                    {
                        type: 'input',
                        name: 'department',
                        message: 'What is the department name?',
                    },
                ])
                .then((response) => {
                    db.connect(function(err) {
                        if (err) {
                          return console.error('error: ' + err.message);
                        }
                        console.log('Connected to the MySQL server.');
                      });
                    db.query(
                        `INSERT INTO employee (f_name, l_name, role, department, salary, manager)
                        VALUES ("${response.first_name}", "${response.last_name}", "${response.role}", "NULL", "0", "${response.manager}");`, 
                        function (err, results) {
                        if (err) {
                            console.error(err);
                          } else {
                            console.log(`${response.first_name} ${response.last_name} was added to the database.`)
                            console.table(results);
                            databasePrompt();
                          }
                        });
                    });
                break;
        case 'Add Department':
            inquirer
                 .prompt([
                    {
                        type: 'input',
                        name: 'department',
                        message: 'What department would you like to add?'
                    },
                    ])
                    .then((response) =>{
                    db.connect(function(err) {
                        if (err) {
                        return console.error('error: ' + err.message);
                        }
                        console.log('Connected to the MySQL server.');
                    });
                    db.query(
                        `INSERT INTO department
                        VALUES ("${response.department}");`, 
                        function (err, results) {
                        if (err) {
                            console.error(err);
                        } else {
                            console.table(results);
                            databasePrompt();
                        }
                    
                        })
                    });
                break
        case 'View All Roles':
            db.connect(function(err) {
                if (err) {
                  return console.error('error: ' + err.message);
                }
                console.log('Connected to the MySQL server.');
              });
            db.query('SELECT * FROM employee', function (err, results) {
                if (err) {
                    console.error(err);
                  } else {
                    console.table(results);
                  }
                });
                db.end();
                break
        case 'View All Departments':
            db.connect(function(err) {
                if (err) {
                  return console.error('error: ' + err.message);
                }
                console.log('Connected to the MySQL server.');
              });
            db.query(
                `SELECT department FROM employee;`, 
                function (err, results) {
                if (err) {
                    console.error(err);
                  } else {
                    console.table(results);
                    databasePrompt();
                  }
                });
                break
        case 'Exit':
            console.log('Thanks for using my app!');
            process.exit();         
        };
    });
};
databasePrompt()