const inquirer = require("inquirer");
const fs = require("fs");
const Dept = require("../Library/department");
const db = require("../middleware/db");



function getStarted () {
    inquirer.prompt ([
        {
            type: "list",
      name: "options",
      message:"Hey There! Welcome.. What would you like to do? Select an option below..", 
      choices: ["View all departments", "View all roles", "View all employees", "Add a department", "Add a Role", "Add an Employee", "Update an Employee's Role"],
        }
    ])

    .then ((answers) => {
        if (answers.options === "View all departments") {
            let dept = new Dept (answers.id, answers.department_name);
            db.query(`SELECT * FROM Department`)
        };
    })
}
// ignore above look at below..tbc
getStarted();

// create classes 


const getDept = (req, res) => {
    req.db.query('SELECT * FROM Department', (err, data) => {
        return res.json ({succss: true, data});

    });
};

