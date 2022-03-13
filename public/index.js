const inquirer = require("inquirer");
const fs = require("fs");


function getStarted () {
    inquirer.prompt ([
        {
            type: "list",
      name: "options",
      message:"Hey There! Welcome.. What would you like to do? Select an option below..", 
      choices: ["View all departments", "View all roles", "View all employees", "Add a department", "Add a Role", "Add an Employee", "Update an Employee's Role"],
        }
    ])
}

getStarted();