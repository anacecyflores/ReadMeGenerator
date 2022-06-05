// TODO: Include packages needed for this application
const fs = require("fs");
const inquirer = require("inquirer");
// Array of questions for user input:
const promptUser = () => {
  return inquirer.prompt([
    {
      type: "input",
      name: "Title",
      message: "What is the title of your project?",
    },
    {
      type: "input",
      name: "Description",
      message: "Please provide a brief description of your project.",
    },
    {
      type: "input",
      name: "installation",
      message:
        "Please indicate what is required for the installation of this project.",
    },
    {
      type: "input",
      name: "Usage",
      message: "Please provide a brief description of how to use your project.",
    },
    {
      type: "input",
      name: "Contributions",
      message: "Please provide additional contributers/collaborators.",
    },
    {
      type: "input",
      name: "Tests",
      message: "Please list which methods were used to test the code if any.",
    },
    {
      type: "list",
      message: "What license are you using for this project?",
      name: "Licenses",
      choices: ["None", "MIT", "Apache 2.0", "GPL v3.0"],
    },
    {
      type: "input",
      name: "Github",
      message: "Please provide your Github Username.",
    },
    {
      type: "input",
      name: "Email",
      message: "Please provide your Email address.",
    },
  ]);
};

// function for appending user input to markdown file
const init = () => {
  promptUser()
    .then((answers) =>
      fs.writeFileSync("./generated.md", generateMarkdown(answers))
    )
    .then(() => console.log("Successfully wrote to generated.md"))
    .catch((err) => console.error(err));
};
// calls function to append user input to markdown file
init();

// function for generating markdown
function generateMarkdown(data) {
  return `
  # ${data.Title}
  # ${data.Description}
  # ${data.Installation}
  # ${data.Usage}
  # ${data.Contributions}
  # ${data.Tests}
  # ${data.Licenses}
  # ${data.Github}
  # ${data.Email}
  `;
}
