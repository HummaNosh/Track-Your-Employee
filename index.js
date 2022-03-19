const inquirer = require("inquirer");
const fs = require("fs");
const DeptClass = require("./Library/dept");
const RoleClass = require("./Library/role");
const EmpClass = require("./Library/emp");
const db = require("./middleware/db");
const res = require('express/lib/response');
const mysql = require("mysql");
require("dotenv").config();


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
        "Nothing",
      ],
        },
       
    ])

    .then ((answers) => {
        if (answers.options === "View all Departments") {
            getDept(req, res);
            getStarted();
        }
    
    if (answers.options === "View all Roles") {
      getRoles(req, res);
      getStarted();
    }
    if (answers.options === "View all Employees") {
      let emps = new Emp (answers.id, answers.first_name, answers.last_name, answers.role_id, answers.manager_id);
      db.query(`SELECT * FROM Employee`)
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

getStarted();
// change the above abit and doublt check the db query


const getDept = (req, res) => {
    req.db.query('SELECT * FROM Department', (err, data) => {
      if (err) {
        console.log(`[ERROR]: Failed to get movies | ${err.message}`);
        return res.status(500).json({ success: false });
      }
        return res.json ({success: true, data});

    });
};

const getRoles = (req, res) => {
    req.db.query('SELECT * FROM Role', (err, data) => {
      if (err) {
        console.log(`[ERROR]: Failed to get role info | ${err.message}`);
        return res.status(500).json({ success: false });
      }
  
      return res.json({ success: true, data });
    });
  };

  const getEmployee = (req, res) => {
    req.db.query('SELECT * FROM Employee ', (err, data) => {
      if (err) {
        console.log(`[ERROR]: Failed to get employee info | ${err.message}`);
        return res.status(500).json({ success: false });
      }
  
      return res.json({ success: true, data });
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
  
