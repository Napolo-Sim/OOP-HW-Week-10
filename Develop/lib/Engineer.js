// TODO: Write code to define and export the Engineer class.  HINT: This class should inherit from Employee.
const Engineer = require("./Employee");

class Engineer extends Employee {
    constructor(name, id, email, github) {
        super(name);
        super(id);
        super(email);
        this.github = github;
    }

    getGithub() {

    }

    getRole() {

    }
}