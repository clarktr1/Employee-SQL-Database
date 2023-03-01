const inquirer = require('inquirer');
const {addEmployee, addRole, updateEmployee, addDepartment, viewRoles, viewDepartments} = require('./query-functions.js');


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
                console.log(response);
                addEmployee(response);
                databasePrompt();
            })
            break;
        case 'Add Role':
            inquirer
                .prompt([
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
                    addRole(response)
                    databasePrompt();
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
                        addDepartment(response);
                        databasePrompt()
                    });
                break
        case 'Update Employee Role':
            updateEmployee();
            break
        case 'View All Roles':
            viewRoles(response);
                break
        case 'View All Departments':
            viewDepartments(response);
            databasePrompt()
                break
        case 'Exit':
            console.log('Thanks for using my app!');
            process.exit();         
        };
    });
};
databasePrompt()