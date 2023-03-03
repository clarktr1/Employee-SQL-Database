const mysql = require('mysql');
const db = require('./server.js');
const inquirer = require('inquirer');


function connect(){
  db.connect(function(err) {
    if (err) {
      return console.error('error: ' + err.message);
    }
    console.log('Connected to the MySQL server.');
  });
}

function addEmployee(){
    const managerList = [];
const roleList = [];

db.query(`SELECT * FROM employee WHERE manager_id = 0;`, function(err, results) {
    if (err) {
        console.error(err);
    } else {
        for (const result of results) {
            managerList.push({
                name: `${result.f_name} ${result.l_name}`,
                value: result.id
            });
        }

        db.query(`SELECT id, role FROM role;`, function(err, results) {
            if (err) {
                console.error(err);
            } else {
                for (const result of results) {
                    roleList.push({
                        name: result.role,
                        value: result.id
                    });
                }
                inquirer.prompt([
                    {
                        type: 'input',
                        name: 'first_name',
                        message: 'What is the employee\'s first name?'
                    },
                    {
                        type: 'input',
                        name: 'last_name',
                        message: 'What is the employee\'s last name?'
                    },
                    {
                        type: 'list',
                        name: 'role',
                        message: 'What is the employee\'s job?',
                        choices: roleList
                    },
                    {
                        type: 'list',
                        name: 'manager',
                        message: 'Who is the employee\'s manager?',
                        choices: managerList
                    },
                ]).then((response) => {

                    db.query(`INSERT INTO employee (f_name, l_name, role_id, manager_id)
                             VALUES ('${response.first_name}', '${response.last_name}', '${response.role}', '${response.manager}');`, 
                        function(err, results) {
                        if (err) { 
                            console.error(err);
                            console.log('Failed to add employee to the database.');
                        } else {
                            console.log(`${response.first_name} ${response.last_name} was added to the database.`);
                            console.table(results);
                        }

                        db.end(); // Close the database connection
                    });
                });
            }
        });
    }
});
};


function addRole(){
    let departmentList = [];
    db.query(`SELECT * FROM department`, 
        function(err, results){
            if(err){
                console.error(err)
            } else {
                for (let i in results)
                departmentList.push({
                    name: results[i].department,
                    value: results[i].id,
                });
                console.log(departmentList)
                    inquirer
                        .prompt([
                            {
                                type: 'input',
                                name: 'role',
                                message: 'What is the name of the role?'
                            },
                            {
                                type: 'number',
                                name: 'salary',
                                message: 'How much does the role make?'
                            },
                            {
                                type: 'list',
                                name: 'department',
                                message: 'What department does this role belong to?',
                                choices: departmentList,
                            },
                    ])
                    .then ((response) => {
                        db.query(`INSERT INTO role (role, salary, department_id) VALUES ('${response.role}', '${response.salary}', '${response.department}')`,
                        function(err, results){
                            if(err){
                                console.error(err)
                            } else {
                                console.table(results);
                                console.log(`${response.role} was added to the database!`)
                            }
                        });
                    });
                };
            });
};

function addDepartment(){
    inquirer
    .prompt([
       {
           type: 'input',
           name: 'department',
           message: 'What department would you like to add?'
       },
       ])
       .then((response) => {
    db.query(`INSERT INTO department(department) VALUES ('${response.department}')`,
    function(err, results){
        if(err){
            console.error(err)
        } else {
            console.table(results);
            console.log(`${response.department} was successfully added to the database. `)
        }
    })
});
};

addEmployee()