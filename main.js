const inquirer = require('inquirer');
const {connect, getDepartment, addEmployee, addRole, updateEmployee, addDepartment, viewRoles, viewDepartments} = require('./query-functions.js');


function main() {
connect();
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
                    type: 'list',
                    message: 'Who is the employee\'s manager? Leave blank if none.',
                    name: 'manager',
                    choices: ['Terry Lancaster', 'Miranda Adams', 'Paul Everlong', 'John Paul']
                },
            ])
            .then((response) => {
                addEmployee(response);
                returnToMainMenu();
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
                        type: 'list',
                        name: 'department',
                        message: 'What is the department name?',
                        choices: ['Placeholder', 'Test']
                    },
                ])
                .then((response) => {
                    addRole(response)
                    returnToMainMenu();
                    });
                break;
        case 'Add Department':
            addDepartment();
            returnToMainMenu()
                break
        case 'Update Employee Role':
            updateEmployee();
            break
        case 'View All Roles':
            viewRoles();
            returnToMainMenu();
                break
        case 'View All Departments':
            viewDepartments(response);
            returnToMainMenu()
                break
        case 'Exit':
            console.log('Thanks for using my app!');
            process.exit();         
        };
    });
};

function returnToMainMenu() {
    inquirer.prompt({
      name: 'returnToMainMenu',
      type: 'confirm',
      message: 'Return to main menu?',
    }).then((answer) => {
      if (answer.returnToMainMenu) {
        main();
      } else {
        console.log('Goodbye!');
        process.exit(0);
      }
    });
  };
main();