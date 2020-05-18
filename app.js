const Manager = require("./lib/Manager.js")
const Engineer = require("./lib/Engineer.js")
const Intern = require("./lib/Intern.js")
const fs = require("fs")
const inquirer = require("inquirer")
const path = require("path")

const OUTPUT_DIR = path.resolve(__dirname, "output")
const outputPath = path.join(OUTPUT_DIR, "team.html")

const render = require("./lib/renderHTML.js")

const employees = []

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

const addEmployee = () => {
  inquirer
    .prompt({
      type: "confirm",
      name: "addEmployee",
      message: "Would you like to add an employee?"
    }).then(function (data) {
      if (data.addEmployee) {
        newEmployee()
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

addEmployee()
