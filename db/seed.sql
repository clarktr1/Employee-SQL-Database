INSERT INTO employee (f_name, l_name, role, department, salary, manager)
    VALUES ("${response.first_name}", "${response.last_name}", "${response.role}", "NULL", "0", "${response.manager}");

INSERT INTO department (department)
    VALUES ("${response.department}");