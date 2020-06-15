const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

let id = 0;
let employeeRoster = [];

generateTeam = () => {
    inquirer.prompt([
        //Universal Prompts
        {
            name: "employeeRole",
            message: "Please pick your role:",
            type: "list",
            choices: ["Intern", "Engineer", "Manager"],
        },

        {
            name: "employeeName",
            message: "Please input your name:",
            type: "input"
        },

        {
            name: "employeeEmail",
            message: "Please input your email:",
            type: "input"
        },

        //Prompts for Specific Roles
        {
            name: "employeeSchool",
            message: "Input the name of your Highschool/College: ",
            type: "input",
            when: (answer) => answer.employeeRole === "Intern",
        },

        {
            name: "employeeGithub",
            message: "Please input your Github:",
            type: "input",
            when: (answer) => answer.employeeRole === "Engineer"
        },

        {
            name: "officeNumber",
            message: "Input your office number: ",
            type: "input",
            when: (answer) => answer.employeeRole === "Manager",
        },
    ])
        //Checks role Type to add members and their specific characteristics to Array of team members
        .then((response) => {
            if (response.employeeRole === "Intern") {
                employeeRoster.push(
                    new Intern(
                        response.employeeName,
                        id,
                        response.employeeEmail,
                        response.employeeSchool
                    )
                );
                id++;
            } else if (response.employeeRole === "Engineer") {
                employeeRoster.push(
                    new Engineer(
                        response.employeeName,
                        id,
                        response.employeeEmail,
                        response.employeeGithub
                    )
                );
                id++;
            } else if (response.employeeRole === "Manager") {
                employeeRoster.push(
                    new Manager(
                        response.employeeName,
                        id,
                        response.employeeEmail,
                        response.officeNumber
                    )
                );
                id++;
            }
            //Asks if another Team Member is wanted to be added for multiple addings in one run
            inquirer.prompt({
                name: "addEmployee",
                message: "Would you like to add another Team Member",
                type: "confirm"
            })
                .then((response) => {
                    if (response.addEmployee) {
                        generateTeam();
                    } else {
                        fs.writeFile("team.html", render(employeeRoster), (error) => {
                            if (error) {
                                throw error;
                            } else {
                                console.log("Addition to Team Successful");
                            }
                        })
                    }
                })
        })
}

generateTeam();


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```

