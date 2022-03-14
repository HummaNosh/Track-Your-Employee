USE track_people_db;

insert Department (id, department_name) values
(10, "Sales"),
(20, "IT"),
(30, "Finance"),
(40, "HR");

SELECT * FROM Department;

insert Role (id, title, salary, department_id) values
(111, "Sales Manager", 35000, 10),
(112, "Sales Agent", 25000, 10),
(113, "Channel Manager", 55000, 10),
(114, "Software Developer", 35000, 20),
(115, "Senior Software developer", 60000, 20),
(116, "IT Director", 75000, 20),
(117, "Accountant", 35000, 30),
(118, "Finance Administrator", 25000, 30),
(119, "Recruitment Officer", 23000, 40),
(120, "HR Manager", 30000, 40);

SELECT * FROM Role;

insert Employee (id, first_name, last_name, role_id, manager_id) values
(001, "Miguel", "Diaz", 111, 003),
(002, "Robby", "Wills", 112, 001),
(003, "Johnny", "Lawrence", 113, NULL),
(004, "Humma", "Noshine", 114, 005),
(005, "Peter", "Mcallister", 115, 006),
(006, "Terry", "Silver", 116, NULL),
(007, "Mike", "Barnes", 117, NULL),
(008, "Shayne", "Tee", 118, 007),
(009, "Nick", "Jones", 119, 010),
(010, "Shelly", "Williams", 120, NULL),
(011, "Danielle", "Stevens", 112, 001),
(012, "Anna", "Frank", 112, 001),
(013, "Iyaana", "Jarrette", 114, 005),
(014, "Marianne", "Haven", 114, 005),
(015, "Mallory", "Beer", 114, 005);

SELECT * FROM Employee;

-- 4 software developers, 3 sales agents

-- Should be the below:
-- Miguel is a sales manager and his manager is Johnny
-- robby, Danielle and anna are a sales agents and their manager is Miguel
-- johnny is a channel manager and hasnt got a manager
-- humma, Iyaana, Marianne and mallory are software developers and their manager is Peter
-- Peter is a senior software developer and his manager is Terry
-- Terry is a IT director and has no manager
-- Mike is a Accountant and has no manager
-- Shayne is a Finance admin and Mike is his manager
-- Nick is a Recruitment Officer and his manager is Shelly
-- Shelly is a HR manager and has no manager

