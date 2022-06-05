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
      name: "license",
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
  # Description:
    ${data.Description}
  # Installation: 
    ${data.Installation}
  # Usage:
    ${data.Usage}
  # Contributors: 
    ${data.Contributions}
  # Tests: 
    ${data.Tests}
  # License: 
    ${createLicenseBadge(data.license)}
    ${createLicenseLink(data.license)}
  # Contact: 
    ${data.Github}
    ${data.Email}
  `;
}

// function to generate license badge
function createLicenseBadge(license) {
  let badge = "";
  if (license === "MIT") {
    badge =
      "![GitHub license](https://img.shields.io/github/license/Naereen/StrapDown.js.svg)";
  } else if (license === "Apache 2.0") {
    badge =
      "![license](https://img.shields.io/badge/License-Apache%202.0-blue.svg)";
  } else if (license === "GPL v3.0") {
    badge =
      "![license: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)";
  } else {
    badge = "";
  }
  return badge;
}
// function to generate license link
function createLicenseLink(license) {
  let licenseLink = "";
  if (license === "MIT") {
    licenseLink = "https://choosealicense.com/license/mit/";
  } else if (license === "Apache 2.0") {
    licenseLink = "http://www.apache.org/license/LICENSE-2.0";
  } else if (license === "GPL v3.0") {
    licenseLink = "https://www.gnu.org/license";
  } else {
    licenseLink = "";
  }
  return licenseLink;
}
