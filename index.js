const inquirer = require("inquirer");
const mysql = require("mysql2");
const Table = require('console.table');
const Connection = require("mysql/lib/Connection");
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
        "Delete an Employee"
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
    if (answers.options === "Update an Employee's Role") {
      updateEmployeeRole();
      }
   if (answers.options === "Delete an Employee") {
      deleteEmp();
      }
});
};


// Get department info as defined in schema/seeds
function getDept() {
  console.log("its working");

    db.query('SELECT * FROM Department', function (err, data) {
      if (err) {
        console.log(`[ERROR]: Failed to get departments`);
        return result.status(500).json({ success: false });
      }
console.table(data)
getStarted();
    });
};
// Get Role info as defined in schema/seeds
function getRoles() {

    db.query('SELECT * FROM Role LEFT JOIN Department ON Role.department_id = Department.id', function (err, data){
      if (err) {
        console.log(`[ERROR]: Failed to get role info | ${err.message}`);
        return result.status(500).json({ success: false });
      }
  
     console.table(data)
     getStarted();
    });
  };
// Get employee data as defined in schema/seeds
function getEmployee() {

    db.query('SELECT * FROM Employee LEFT JOIN Role ON Employee.role_id = Role.id', function (err, data) {
      if (err) {
        console.log(`[ERROR]: Failed to get employee info | ${err.message}`);
        return result.status(500).json({ success: false });
      }
  
     console.table(data)
     getStarted();
    });
  }

//THIS DOESNT WORK
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
    getDept();

  });
}
 );
}

// THIS DOESNT WORK
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


// Add an employee by entering name, role and manager id
function addEmp () {
  db.query("SELECT * FROM Role", function (error, result) {
    if (error) {
      console.log(error);
    }

    const addNewRoles = result.map(Role => {
      return {
        name: Role.title,
        value: Role.id
      }
    })
    inquirer
    .prompt([
      {
        type: "input",
        name: "first_name",
        message: "Please enter the first name of the new employee?",
      },
      {
        type: "input",
        name: "last_name",
        message: "Please enter the last name of the new employee",
      },
      {
        type: "list",
        name: "role_id",
        message: "Please select the role the new employee is taking on?",
        choices: addNewRoles,
      },
      {
        type: "input",
        name: "manager",
        message: "Please enter the manager's ID",
    
      },
    ])
    .then((answers) => {
 
      db.query(
        "INSERT INTO Employee SET ?",
        {
          first_name: answers.first_name,
          last_name: answers.last_name,
          role_id: answers.role_id,
          manager_id: answers.manager,
        },
        function (error, result) {
          if (error) {
            console.log(error);
          }
          
          console.table(result);
          getStarted();
        }
        );
      });
    });
  }

// Update employee roles by using their names..

function updateEmployeeRole() {

  db.query("SELECT * FROM Role", function (error, result) {
    if (error) {
      console.log(error);
    }


    const RoleData = result.map(role => {
      return {
        name: role.title,
        value: role.id
      }
    })

    db.query("SELECT * FROM Employee", (err, result) => {
      if(err) {
        console.log(err);
        throw err;
      }

      const EmpData = result.map(Employee => {
        return {
          name: Employee.first_name + " " + Employee.last_name,
          value: Employee.id
        }
      });

      inquirer
        .prompt([
          {
            
            type: "list",
            name: "Employee",
            message: "Please select the name of the employee whose role you would like to update",
            choices: EmpData
          },
          {
            
            type: "list",
            name: "role",
            message: "Please select their new role",
            choices: RoleData
          },
        ])
        .then((result) => {
          console.log(result.Employee);
          console.log(result.role);
          db.query(
            "UPDATE Employee SET Employee.role_id = ? WHERE Employee.id = ?",
            [result.role, result.Employee], (err, result) => {
              if (err) throw err;
            
              console.table(result);
              getStarted();
            }
          );
        })
        .catch(err => {
          console.log(err)
        });

    });  

  });  

}

// THIS DOESNT WORK
function deleteEmp () {
  db.query(` SELECT * FROM Employee`), (err, result) => {
    if (err) {
      console.log(err)
    }
    const Emp = result.map((Employee) => ({
      name: Employee.first_name + " " + Employee.last_name,
      value: Employee.id,
    }));
    inquirer
      .prompt([
        {
          type: "list",
          name: "employee",
          message: "Which employee would you like to delete?",
          choices: Emp,
        },
      ])
      .then((answers) => {
        db.query(
          `DELETE FROM Employee WHERE ?`,
          [
            {
              id: answers.employee,
            },
          ],
          (err, result) => {
            if (err) throw err;
      console.log(result)
            getStarted();
          }
        );
      });
  }}