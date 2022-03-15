const express = require('express');
const inquirer = require("inquirer");
const fs = require("fs");
const Dept = require("./Library/dept");
const db = require("./middleware/db");
const PORT = process.env.PORT || 3001;


const app = express();
// Middleware

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(db);



function getStarted () {
    inquirer.prompt ([
        {
            type: "list",
      name: "options",
      message:"Hey There! Welcome.. What would you like to do? Select an option below..", 
      choices: ["View all departments", "View all roles", "View all employees", "Add a department", "Add a Role", "Add an Employee", "Update an Employee's Role"],
        }
    ])

    // .then ((answers) => {
    //     if (answers.options === "View all departments") {
    //         let dept = new Dept (answers.id, answers.department_name);
    //         db.query(`SELECT * FROM Department`)
    //     };
    // })
};

getStarted();

// create classes 


const getDept = (req, res) => {
    req.db.query('SELECT * FROM Department', (err, data) => {
        return res.json ({success: true, data});

    });
};

const getRole = (req, res) => {
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
  };
  const updateEmpbyID = (req, res) => {
    const { EmpName } = req.body;
    const { EmpID } = req.params;
  
    if (!EmpName) {
      return res
        .status(400)
        .json({ success: false, error: 'Please provide a name' });
    }
  
    req.db.query(
      `UPDATE movies SET department_name ="${EmpName}" WHERE id=${EmpID}`,
      (err) => {
        if (err) {
          console.log(`[ERROR]: Failed to update movie | ${err.message}`);
          return res.status(500).json({ success: false });
        }
  
        return res.json({ success: true });
      }
    );
  };

app.listen(PORT, () =>
  console.log(`Your app is listening on http://localhost:${PORT}`)
);

module.exports = {
    getDept,
    getRole,
    getEmployee,
    updateEmpbyID,
};