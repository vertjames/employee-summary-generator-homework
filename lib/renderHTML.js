// Require some node packages:
const fs = require("fs")
const path = require("path")

// Set a variable for drilling down into the "templates" directory:
const templatesDir = path.resolve(__dirname, "../templates")

// Set a variable that contains a function for rendering an array of employee cards and adding them to the HTML:
const render = employees => {
  const html = []
  html.push(employees
    .filter(employee => employee.getRole() === "Manager")
    .map(manager => renderManager(manager))
  )
  html.push(employees
    .filter(employee => employee.getRole() === "Engineer")
    .map(engineer => renderEngineer(engineer))
  )
  html.push(employees
    .filter(employee => employee.getRole() === "Intern")
    .map(intern => renderIntern(intern))
  )
  return renderMain(html.join(""))
}

// Set a variable that contains a function for replacing the designated "team" placeholder in main.html with the generated employee cards:
const renderMain = html => {
  const template = fs.readFileSync(path.resolve(templatesDir, "main.html"), "utf8")
  return replacePlaceholders(template, "team", html)
}

// Set a variable that contains a function for replacing placeholders in html template files with input from user:
const replacePlaceholders = (template, placeholder, value) => {
  const pattern = new RegExp("{{ " + placeholder + " }}", "gm")
  return template.replace(pattern, value)
}

// Render individual employee cards based on user input:
const renderManager = manager => {
  let template = fs.readFileSync(path.resolve(templatesDir, "manager.html"), "utf8")
  template = replacePlaceholders(template, "name", manager.getName())
  template = replacePlaceholders(template, "role", manager.getRole())
  template = replacePlaceholders(template, "email", manager.getEmail())
  template = replacePlaceholders(template, "id", manager.getId())
  template = replacePlaceholders(template, "officeNumber", manager.getOfficeNumber())
  return template
}
const renderEngineer = engineer => {
  let template = fs.readFileSync(path.resolve(templatesDir, "engineer.html"), "utf8")
  template = replacePlaceholders(template, "name", engineer.getName())
  template = replacePlaceholders(template, "role", engineer.getRole())
  template = replacePlaceholders(template, "email", engineer.getEmail())
  template = replacePlaceholders(template, "id", engineer.getId())
  template = replacePlaceholders(template, "github", engineer.getGithub())
  return template
}
const renderIntern = intern => {
  let template = fs.readFileSync(path.resolve(templatesDir, "intern.html"), "utf8")
  template = replacePlaceholders(template, "name", intern.getName())
  template = replacePlaceholders(template, "role", intern.getRole())
  template = replacePlaceholders(template, "email", intern.getEmail())
  template = replacePlaceholders(template, "id", intern.getId())
  template = replacePlaceholders(template, "school", intern.getSchool())
  return template
}

// Make all this available: 
module.exports = render
