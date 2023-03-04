const inquirer = require('inquirer');
const {connect, getDepartment, addEmployee, addRole, updateEmployee, addDepartment, viewRoles, viewDepartments} = require('./query-functions.js');


const main = async () => {
let choice = ''
connect();
while (choice !== 'Exit'){
const {action} = await inquirer
    .prompt([
    {   type: 'list',
        name: 'action',
        message: 'What would you like to do?',
        choices: ['Add Employee',  'Add Role',  'Add Department', 'Update Employee Role', 'View All Roles','View All Departments', 'Exit' ],
    }
    ])
    switch (action) {
        case 'Add Employee':
        addEmployee();   
            break;
        case 'Add Role':
                addRole();
                break;
        case 'Add Department':
            addDepartment();
                break
        case 'Update Employee Role':
            updateEmployee();
            break
        case 'View All Roles':
            viewRoles();
                break
        case 'View All Departments':
            viewDepartments();
                break
        case 'Exit':
            console.log('Thanks for using my app!');
            process.exit();         
        };
    };
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