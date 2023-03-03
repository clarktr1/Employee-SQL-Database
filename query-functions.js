const mysql = require('mysql');
const db = require('./server.js')
const inquirer = require('inquirer')

function connect(){
  db.connect(function(err) {
    if (err) {
      return console.error('error: ' + err.message);
    }
    console.log('Connected to the MySQL server.');
  });
}

function addEmployee(response){
    db.query(
        `INSERT INTO employee (f_name, l_name, role, manager_id)
        VALUES ("${response.first_name}", "${response.last_name}", "${response.role}", "${response.manager}");`, 
        function (err, results) {
        if (err) {
            console.error(err);
          } else {
            console.log(`${response.first_name} ${response.last_name} was added to the database.`)
            console.table(results);
          }
        });
}


const getDepartment =
  db.query(
    `SELECT * FROM department;`, 
    function (err, results) {
    if (err) {
        console.error(err);
    }
    for (let i in results) 
    return results[i]
});

// function addRole(response){
//     db.query(
//         `INSERT INTO role (role, salary, department)
//         VALUES ("${response.role}", "${response.salary}", "${response.department}");`, 
//         function (err, results) {
//         if (err) {
//             console.error(err);
//           } else {
//             console.log(`${response.role} was added to the database.`)
//             console.table(results);
//           }
//         });
}
// function addDepartment(response){
//     db.query(
//         `INSERT INTO department (department)
//         VALUES ('${response.department}');`, 
//         function (err, results) {
//         if (err) {
//             console.error(err);
//         } else {
//             console.table(results);
//             console.log(`${response.department} added to department database!`)
//         }
//     });
//  }
function updateEmployee(){
  let employeeList = []
  let roleList = []
    db.query(`SELECT id, f_name, l_name FROM employee;`,
    function (err, results) {
    if (err) {
        console.error(err);
    } else {
      for (let i in results)
        employeeList.push({
          name:`${results[i].f_name} ${results[i].l_name}`,
          value: results[i].id,
        });
        console.log(employeeList)
        inquirer
          .prompt([
            {
              type: 'list',
              name: 'name',
              message: 'Which employee?',
              choices: employeeList,
            },
            {
              type: 'list',
              name: 'role',
              message: 'What is the role?',
              choices: ['Test', 'Test2'],
            }
          ])
          .then(response => {
            db.connect(function(err) {
              if (err) {
              return console.error('error: ' + err.message);
              }
              console.log('Connected to the MySQL server.');
            db.query(`UPDATE employee SET role = 'new_role' WHERE id = ${response.name};`,
            function (err, results) {
              if (err) {
                console.error(err);
              } else {
                console.table(results);
              }
            });
            
          })
        }
      )}
    });
  };

//Works
function viewRoles(response){
    db.query(
        'SELECT * FROM role', 
        function (err, results) {
        if (err) {
            console.error(err);
          } else {
            console.table(results);
          }
        });
}

//Works
function viewDepartments(response){

    db.query(
        `SELECT * FROM department;`, 
        function (err, results) {
        if (err) {
            console.error(err);
          } else {
            console.table(results);
            databasePrompt();
          }
        });
}

module.exports = {connect, getDepartment, addEmployee, addRole, addDepartment, updateEmployee, viewRoles, viewDepartments}
