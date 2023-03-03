INSERT INTO employee (f_name, l_name, role_id, manager_id)
    VALUES  ('Trey', 'Clark', 1, 2),
            ('Tony', 'Stark', 1, 0);

INSERT INTO department (department)
    VALUES ('Legal'), ('Sales'), ('Administration'), ('Engineering');

INSERT INTO role (role, salary, department_id)
    VALUES ('Software Engineer', 100000, 4);