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
        addEmployee();   
        returnToMainMenu();
            break;
        case 'Add Role':
                addRole();
                returnToMainMenu();
                break;
        case 'Add Department':
            addDepartment();
            returnToMainMenu()
                break
        case 'Update Employee Role':
            updateEmployee();
            returnToMainMenu()
            break
        case 'View All Roles':
            viewRoles();
            returnToMainMenu();
                break
        case 'View All Departments':
            viewDepartments();
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