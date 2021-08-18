const inquirer = require("inquirer") 
const fs = require("fs") 
const Manager = require("./lib/Manager")
const Engineer = require("./lib/Engineer") 
const Intern = require("./lib/Intern") 
const path = require("path") 
const OUTPUT_DIR=path.resolve(__dirname,"output") 
const outputPath = path.join(OUTPUT_DIR,"team.HTML")
const render = require("./src/generateHTML") 
const teamMembers = [] 


function teamQuestions() { 
function createManager() { 
inquirer
  .prompt([
    {
      type: 'input',
      message: "What is your manager's name",
      name: 'managerName',
    }, 
    {
        type: "input", 
        message: "What is the team manager's email",
        name: "managerEmail"
    },
    {
      type: "input", 
      message: "What is the manager's office number",
      name: "managerOfficeNumber"
  }, 
  {
    type: "input", 
    message: "What is the manager's id",
    name: "managerId"
}
  ]) .then(answers => {
      const manager = new Manager(answers.managerName, answers.managerId,answers.managerEmail, answers.managerOfficeNumber)
      teamMembers.push(manager)
      createTeam()
  }) 
  function createTeam(){
      inquirer.prompt([
        {
          type: "list",
          name: "memberChoice",
          message: "Which type of team member would you like to add?",
          choices: [
            "Engineer",
            "Intern",
            "Done adding team members"
          ]
        }
      ]).then(userChoice => {
          if (userChoice.memberChoice === "Engineer") {
               addEngineer()
          } else if (userChoice.memberChoice === "Intern") {
               addIntern()
          } else {
               buildTeam()
          }
      });
    } 
    function addEngineer(){ 
      inquirer 
      .prompt([
      { 
        type: 'input',
        message: "What is your engineer's name",
        name: 'engineerName',
      }, 
      {
          type: "input", 
          message: "What is the team engineer's ID",
          name: "engineerId"
      }, 
      {
        type: "input", 
        message: "What is the team engineer's email",
        name: "engineerEmail"
    }, 
    {
      type: "input", 
      message: "What is the team engineer's gitHub",
      name: "engineerGithub"
  } 
      ]).then(answers => {
        const engineer = new Engineer(answers.engineerName,answers.engineerId, answers.engineerEmail, answers.engineerGithub)
        teamMembers.push(engineer) 
        createTeam()
    })
  } 
  function addIntern(){ 
    inquirer 
    .prompt([
    { 
      type: 'input',
      message: "What is your intern's name",
      name: 'internName',
    }, 
    {
        type: "input", 
        message: "What is the intern's ID",
        name: "internId"
    }, 
    {
      type: "input", 
      message: "What is the intern's email",
      name: "internEmail"
  }, 
  {
    type: "input", 
    message: "What is the intern's school",
    name: "internSchool"
} 
    ]).then(answers => {
      const intern = new Intern(answers.internName, answers.internId, answers.internEmail, answers.internSchool)
      teamMembers.push(intern)
      createTeam()
    })
  }
}
function buildTeam() {
    if (!fs.existsSync(OUTPUT_DIR)) {
      fs.mkdirSync(OUTPUT_DIR)
    }
    fs.writeFileSync(outputPath, render(teamMembers), "utf-8");
  }  
  createManager() 
} 
teamQuestions();