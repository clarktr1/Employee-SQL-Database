const mysql = require('mysql');
const db = require('./server.js')
const inquirer = require('inquirer')


function addEmployee(response){
    db.connect(function(err) {
        if (err) {
          return console.error('error: ' + err.message);
        }
        console.log('Connected to the MySQL server.');
      });
    db.query(
        `INSERT INTO employee (f_name, l_name, role, manager)
        VALUES ("${response.first_name}", "${response.last_name}", "${response.role}", "${response.manager}");`, 
        function (err, results) {
        if (err) {
            console.error(err);
          } else {
            console.log(`${response.role} was added to the database.`)
            console.table(results);
          }
        });
        db.end();
}

function addRole(response){
    db.connect(function(err) {
        if (err) {
          return console.error('error: ' + err.message);
        }
        console.log('Connected to the MySQL server.');
      });
    db.query(
        `INSERT INTO ROLE (role, department, salary)
        VALUES (""${response.role}", "${response.salary}", "${response.manager}");`, 
        function (err, results) {
        if (err) {
            console.error(err);
          } else {
            console.log(`${response.first_name} ${response.last_name} was added to the database.`)
            console.table(results);
          }
        });
}
function addDepartment(response){
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
    });
 }
function updateEmployee(){
  let employeeList = []
  let roleList = []
    db.connect(function(err) {
        if (err) {
        return console.error('error: ' + err.message);
        }
        console.log('Connected to the MySQL server.');
    });
    db.query(`SELECT role FROM employee`,
    function (err, results) {
      if (err) {
        console.error(err);
      } else {
        for (let i in results)
        roleList = Array.from(new Set(results));
        console.log(roleList)
      }
    })
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
        console.log(employeeList);
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
              choices: removeAllListeners,
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
              db.end()
            });
            
          })
        }
      )}
    });
  };
function viewRoles(response){
    db.connect(function(err) {
        if (err) {
          return console.error('error: ' + err.message);
        }
        console.log('Connected to the MySQL server.');
      });
    db.query(
        'SELECT * FROM employee', 
        function (err, results) {
        if (err) {
            console.error(err);
          } else {
            console.table(results);
          }
        });
        db.end();
}
function viewDepartments(response){
    db.connect(function(err) {
        if (err) {
          return console.error('error: ' + err.message);
        }
        console.log('Connected to the MySQL server.');
      });
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

module.exports = {addEmployee, addRole, addDepartment, updateEmployee, viewRoles, viewDepartments}
