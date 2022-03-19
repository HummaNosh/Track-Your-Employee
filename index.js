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
  console.log(`Connected to the company_db database.`);
  getStarted();
});
let teamArray = [];



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
        "Add a department", 
        "Add a Role", 
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
    };
    if (answers.options === "Add an department") {
        let addDep = new DeptClass (answers.id, answers.department_id);
        teamArray.push(addDep);
      }
    if (answers.options === "Add an Role") {
        let addRole = new RoleClass (answers.id, answers.department_id);
        teamArray.push(addRole);
      }
      if (answers.options === "Add an Employee") {
        let addEmp = new EmpClass (answers.id, answers.department_id);
        teamArray.push(addEmp);
      }
      if (answers.newDep === "What is the name of your new department?") {
        
      }
});
};


// change the above abit and doublt check the db query

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


  // const addnewDep = (req, res) => {
  //   console.log("add a new dep!!!!!!!!!!!!!!!")
    // const query ('SELECT * FROM Employee ', (err, data) => {
    //   if (err) {
    //     console.log(`[ERROR]: Failed to get employee info | ${err.message}`);
    //     return res.status(500).json({ success: false });
    //   }
  
    //   return res.json({ success: true, data });
    // });
  // }
  // {
  //   type: "input",
  //   name: "newDep",
  //   message:"What is the name of your new department?", 
   
  //     },


  const updateEmpbyID = (req, res) => {
    const { EmpName } = req.body;
    const { EmpID } = req.params;
  
    if (!EmpName) {
      return res
        .status(400)
        .json({ success: false, error: 'Please provide a name' });
    }
  
    req.db.query(
      `UPDATE Roles SET first_name and last_name ="${EmpName}" WHERE id=${EmpID}`,
      (err) => {
        if (err) {
          console.log(`[ERROR]: Failed to update movie | ${err.message}`);
          return res.status(500).json({ success: false });
        }
  
        return res.json({ success: true });
      }
    );
  };
  
