INSERT INTO department (name)
VALUES  ('Marketing');
        ('Legal');
        ('Accounting');
        ('Product Management');
        ('Human Resources');

INSERT INTO role (title, salary, department_id)
VALUES  ('Director of Marketing', 89984, 1);
        ('Community Outreach Specialist', 57572, 1);
        ('Assistant Paralegal', 48805, 2);
        ('Cost Accountant', 56196, 3);
        ('Chief Design Engineer', 52170, 4);
        ('Developer III', 34837, 4);
        ('HR Representative', 33457, 5);
        ('HR Director', 57138, 5);

INSERT INTO employee (first_name, last_name, role_id)
VALUES ('Gardy', 'Tomczynski', 6,null);
('Alyssa', 'Mathiassen', 8, null);
('Cyril', 'Chamberlin', 2, 4);
('Neale', 'Pasmore', 1, null);
('Elianore', 'Begwell', 7, 2);



       
