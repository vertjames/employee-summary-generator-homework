// Require some js files and node packages:
const Manager = require("./lib/Manager.js")
const Engineer = require("./lib/Engineer.js")
const Intern = require("./lib/Intern.js")
const fs = require("fs")
const inquirer = require("inquirer")
const path = require("path")

// Create variables for drilling down into the "output" directory and rendering the 'team.html' file there:
const OUTPUT_DIR = path.resolve(__dirname, "output")
const outputPath = path.join(OUTPUT_DIR, "team.html")

// Create a variable to use the 'renderHTML.js' file:
const render = require("./lib/renderHTML.js")

// Create an empty array called 'employees' to push employee data in as we add additional employees:
const employees = []

// Prompt the user to answer questions about the new employee they want to add:
const newEmployee = () => {
  inquirer.prompt([
      {
        type: "input",
        name: "name",
        message: "What is the name of the employee?"
      }, {
        type: "input",
        name: "id",
        message: "What is the ID of the employee?"
      }, {
        type: "input",
        name: "email",
        message: "What is the employee's email address?"
      }, {
        type: "list",
        name: "role",
        message: "What role does the employee play in the organization?",
        choices: [
          "Manager",
          "Engineer",
          "Intern"
        ]
      }
  // Use a switch case to run through each employee type, ask an additional question based on employee type, and push each employee into the 'employees' array as the user adds them, then ask the user if they want to add another employee:
    ]).then(function (data) {
      switch (data.role) {
        case "Manager":
          inquirer.prompt(
            {
              type: "input",
              name: "officeNumber",
              message: "What is the manager's office number?"
            }
          ).then(function (manData) {
            const newManager = new Manager(data.name, data.id, data.email, manData.officeNumber)
            newManager.role = "Manager"
            employees.push(newManager)
            addEmployee()
          })
          break
        case "Engineer":
          inquirer.prompt(
            {
              type: "input",
              name: "github",
              message: "What is the engineer's Github Username?"
            }
          ).then(function (engData) {
            const newEngineer = new Engineer(data.name, data.id, data.email, engData.github)
            newEngineer.role = "Engineer"
            employees.push(newEngineer)
            addEmployee()
          })
          break
        case "Intern":
          inquirer.prompt(
            {
              type: "input",
              name: "school",
              message: "What is the intern's school?"
            }
          ).then(function (intData) {
            const newIntern = new Intern(data.name, data.id, data.email, intData.school)
            newIntern.role = "Intern"
            employees.push(newIntern)
            addEmployee()
          })
          break
      }
    })
}

// Ask the user if they want to add an employee:
const addEmployee = () => {
  inquirer
    .prompt({
      type: "confirm",
      name: "addEmployee",
      message: "Would you like to add an employee?"
    }).then(function (data) {
    // If the users chooses 'y' (to add a new employee) then run the newEmployee function to get user input:
      if (data.addEmployee) {
        newEmployee()
    // If instead the users chooses 'n' (to not add a new employee), then write a file called team.html into the 'output' diretory:
      } else {
        fs.writeFile(outputPath, render(employees), "utf8", function (err) {
          if (err) {
            console.log(err)
          }
          console.log("Success!")
        })
      }
    })
}

// Run the 'addEmployee' function
addEmployee()
