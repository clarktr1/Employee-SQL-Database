function addEmployee(reponse){
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
        db.end();
}

module.exports = addEmployee()
