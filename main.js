const inquirer = require('inquirer');
const figlet = require('figlet')
const {connect, addEmployee, addRole, updateEmployee, addDepartment, viewRoles, viewDepartments, viewEmployees} = require('./query-functions.js');


const main = async () => {
let choices = ''
connect();
figlet('Employee Database', async function (err, data) {
    if (err) {
        console.log('Error creating header:', err);
    } else {
        console.log(data);

        while (choices !== 'Exit'){
            const {action} = await inquirer
                .prompt([
                {   type: 'list',
                    name: 'action',
                    message: 'Main Menu:',
                    choices: ['Add Employee',  'Add Role',  'Add Department', 'Update Employee Role', 'View All Roles','View All Departments','View All Employees', 'Exit' ],
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
                    case 'View All Employees':
                        viewEmployees()
                        break
                    case 'Exit':
                        console.log('Thanks for using my app!');
                        process.exit();         
                    };
                };
    }
});

};

main();