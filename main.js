const { error } = require('console');
const inquirer = require('inquirer');
const mysql = require('mysql');
const table = require('console.table');



const databasePrompt = () => {
    const db = mysql.createConnection(
        {
          host: 'localhost',
          user: 'root',
          password: 'root',
          database: 'employees_db'
        }, 
      );
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
                    type: 'input',
                    message: 'What is the employee\'s role?',
                    name: 'role',
                    validate: (input) => {
                        if (!input) {
                          return 'Role is required';
                        } else if (!/^[a-z A-Z]+$/.test(input)) {
                            return 'Role should only container letters';
                        } return true
                    },
                },
                {
                    type: 'input',
                    message: 'Who is the employee\'s manager? Leave blank if none.',
                    name: 'manager',
                },
            ])
            .then((response) => {
                console.log(response)

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
                    console.log(response);
                })
                break
        case 'View All Roles':
            db.connect(function(err) {
                if (err) {
                  return console.error('error: ' + err.message);
                }
                console.log('Connected to the MySQL server.');
              });
            db.query('SHOW TABLES', function (err, results) {
                if (error) {
                    console.error(err);
                  } else {
                    console.table(results);
                  }
                });
                db.end();
                break
        case 'Exit':
            console.log('Thanks for using my app!');
            process.exit();         
};
});
};
databasePrompt()