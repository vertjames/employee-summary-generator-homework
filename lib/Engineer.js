const Employee = require("./Employee")

class Engineer extends Employee {
  constructor(name, id, email, githubUsername) {
    super(name, id, email)
    this.role = "Engineer"
    this.github = githubUsername
  }
  getGithub() {
    return this.github
  }
  getRole() {
    return this.role
  }
}

module.exports = Engineer