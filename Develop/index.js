// TODO: Include packages needed for this application
const fs = require("fs");
const inquirer = require("inquirer");
// Array of questions for user input:
const promptUser = () => {
  return inquirer.prompt([
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
      name: "Installation",
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
      choices: ["None", "MIT", "Apache--2.0", "GPL v3.0"],
    },
  ]);
};

// function for appending user input to markdown file
const init = () => {
  promptUser()
    .then((data) => fs.writeFileSync("./generated.md", generateMarkdown(data)))
    .then(() => console.log("Successfully wrote to generated.md"))
    .catch((err) => console.error(err));
};
// calls function to append user input to markdown file
init();
// function for generating markdown
function generateMarkdown(data) {
  createLicenseBadge(data.license);
  createLicenseLink(data.license);

  return `
  # ${data.Title}
  ![license-badge](https://img.shields.io/badge/license-${data.license}-blue)

# Description:
${data.Description}

# Table Of Contents:
* [Installation](#Installation)
* [Usage](#Usage)
* [Contributors](#Contributors)
* [Tests](#Tests)
* [License](#License)
* [Contact](#Contact)

# Installation: 
${data.Installation}
# Usage:
${data.Usage}
# Contributors: 
${data.Contributions}
# Tests: 
${data.Tests}
# License
${data.license} License
  Copyright (c) 2022 ${data.Github}
  Licensed under the ${licenseLink} License.
  ## Questions
 * GitHub Profile - https://github.com/${data.Github}
 * Email me at ${data.Email}
`;
}

// function to generate license badge
let badge = "";
function createLicenseBadge(license) {
  if (license === "MIT") {
    badge =
      "![GitHub license](https://img.shields.io/github/license/Naereen/StrapDown.js.svg)";
  } else if (license === "Apache--2.0") {
    badge =
      "![License](https://img.shields.io/badge/License--Apache%202.0-blue.svg)";
  } else if (license === "GPL v3.0") {
    badge =
      "![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)";
  }
  console.log(badge);
  // return badge;
}
// function to generate license link
function createLicenseLink(license) {
  if (license === "MIT") {
    licenseLink = `[MIT](https://opensource.org/licenses/MIT)`;
  }
  if (license === "GPLv3") {
    licenseLink = `[GPLv3](https://www.gnu.org/licenses/gpl-3.0.en.html)`;
  }
  if (license === "Apache--2.0") {
    licenseLink = `[Apache-2.0](https://opensource.org/licenses/Apache-2.0)`;
  }
}
