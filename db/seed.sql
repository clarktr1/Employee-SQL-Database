INSERT INTO employee (f_name, l_name, role_id, manager_id)
    VALUES  ('Trey', 'Clark', 1, 2),
            ('Tony', 'Stark', 1, 0),
            ('Spongebob', 'Squarepants', 2, 2)
            ('Ace', 'Ventura', 5, 0),
            ('Ron', 'Burgundy', 5, 4);

INSERT INTO department (department)
    VALUES  ('Legal'), ('Sales'), ('Administration'), ('Engineering');

INSERT INTO role (role, salary, department_id)
    VALUES  ('Software Engineer', 100000, 4),
            ('Senior Developer', 120000, 4),
            ('Vice President', 150000, 3),
            ('Sales Consultant', 60000, 2),
            ('Litigation Lawyer', 80000, 1);