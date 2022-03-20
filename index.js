const inquirer = require("inquirer");
const mysql = require("mysql2");
const Table = require('console.table');
require("dotenv").config();

// Bring in the database connection
const db = mysql.createConnection({
  host: "localhost",
  user:"root",
  password: "password",
  database: "track_people_db",

});

db.connect((err) => {
  if (err) throw err;
  getStarted();
});




const getStarted = () => {
    inquirer.prompt ([
        {
      type: "list",
      name: "options",
      message:"Hey There! Welcome.. What would you like to do? Select an option below..", 
      choices: [
        "View all Departments",
        "View all Roles", 
        "View all Employees", 
        "Add a new Department", 
        "Add a new Role", 
        "Add an Employee", 
        "Update an Employee's Role",
        "Nothing"
      ],
        },
       
    ])
    .then ((answers) => {
    if (answers.options === "View all Departments") {
      getDept();
    }
    if (answers.options === "View all Roles") {
      getRoles();
    }
    if (answers.options === "View all Employees") {
      getEmployee();
    }
    if (answers.options === "Add an new Department") {
     addDep();
    }
    if (answers.options === "Add an new Role") {
    addRoles();
    }
   if (answers.options === "Add an Employee") {
    addEmp();
    }
});
};



function getDept() {
  console.log("its working");

    db.query('SELECT * FROM Department', function (err, data) {
      if (err) {
        console.log(`[ERROR]: Failed to get departments`);
        return res.status(500).json({ success: false });
      }
console.table(data)
getStarted();
    });
};

function getRoles() {

    db.query('SELECT * FROM Role LEFT JOIN Department ON Role.department_id = Department.id', function (err, data){
      if (err) {
        console.log(`[ERROR]: Failed to get role info | ${err.message}`);
        return res.status(500).json({ success: false });
      }
  
     console.table(data)
     getStarted();
    });
  };

function getEmployee() {

    db.query('SELECT * FROM Employee LEFT JOIN Role ON Employee.role_id = Role.id', function (err, data) {
      if (err) {
        console.log(`[ERROR]: Failed to get employee info | ${err.message}`);
        return res.status(500).json({ success: false });
      }
  
     console.table(data)
     getStarted();
    });
  }


function addDep() {

  inquirer.prompt([
    {
    type: "input",
    name: "addDep",
    message: "What is the name of your new Department?",
  },
])
 .then ((answers) => {
   console.log( answers);
  const sql = `INSERT INTO Department (names) VALUES (?)`;
  db.query(sql, answers.addDep, (err, result) => {

    if (err) throw err;
    console.log("Added " + answers.addDep + " to departments!");
    getDept();

  });
}
 );
}

function addRoles() {

  db.query(`SELECT * FROM Department;`, (err, result) => {
    if (err) throw err;
    let department = result.map((Department) => ({
      name: Department.names,
      value: Department.id,
    }));
    inquirer
      .prompt([
        {
          type: "input",
          name: "role",
          message: "What role do you want to add?",
        },
        {
          type: "input",
          name: "salary",
          message: "What is the salary of this role?",
        },
        {
          type: "list",
          name: "deptName",
          message: "Which department do you want to add the new role to?",
          choices: department,
        },
      ])
      .then((answers) => {
        db.query(
          `INSERT INTO roles SET ?`,
          {
            title: answers.role,
            salary: answers.salary,
            department_id: answers.deptName,
          },
          (err, result) => {
            if (err) throw err;
          console.log("something")
            getStarted();
          }
        );
      });
  });
}


function addEmp() {
  db.query(`SELECT * FROM Role;`, (err, result) => {
    if (err) throw err;
    const role = result.map((Role) => ({ name: Role.title, value: Role.id }));
    db.query(`SELECT * FROM Employee;`, (err, result) => {
      if (err) throw err;
      const Employee = result.map((Employee) => ({
        name: Employee.first_name + " " + Employee.last_name,
        value: Employee.id,
      }));
      inquirer
        .prompt([
          {
            type: "input",
            name: "firstName",
            message: "What is the first name of the new employee?",
          },
          {
            type: "input",
            name: "lastName",
            message: "What is the employee's surname?",
          },
          {
            type: "list",
            name: "role",
            message: "Please select the role the new employee is taking on?",
            choices: role,
          },
          {
            type: "list",
            name: "manager",
            message: "Please select the new employee's manager",
            choices: Employee,
          },
        ])
        .then((answers) => {
          db.query(
            `INSERT INTO Employee SET ?`,
            {
              first_name: answers.firstName,
              last_name: answers.lastName,
              role_id: answers.role,
              manager_id: answers.manager,
            },
            (err, result) => {
              if (err) throw err;
              console.log("Wahoo! Your new employee has been added, please check out 'view all employees' for more information" )
              getStarted();
            }
          );
        });
    });
  });
}

  // const updateEmpbyID = (req, res) => {
  //   const { EmpName } = req.body;
  //   const { EmpID } = req.params;
  
  //   if (!EmpName) {
  //     return res
  //       .status(400)
  //       .json({ success: false, error: 'Please provide a name' });
  //   }
  
  //   req.db.query(
  //     `UPDATE Roles SET first_name and last_name ="${EmpName}" WHERE id=${EmpID}`,
  //     (err) => {
  //       if (err) {
  //         console.log(`[ERROR]: Failed to update movie | ${err.message}`);
  //         return res.status(500).json({ success: false });
  //       }
  
  //       return res.json({ success: true });
  //     }
  //   );
  // };
  
