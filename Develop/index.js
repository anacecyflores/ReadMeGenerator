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

function createTable(license) {
  if (license === "None") {
    return "";
  } else {
    return "* [License](#License)";
  }
}
// calls function to append user input to markdown file
init();
// function for generating markdown
function generateMarkdown(data) {
  return `
  # ${data.Title}
${createLicenseBadge(data.license)}
# Description:
${data.Description}

# Table Of Contents:
* [Installation](#Installation)
* [Usage](#Usage)
* [Contributors](#Contributors)
* [Tests](#Tests)
${createTable(data.license)}
* [Contact](#Contact)

# Installation: 
${data.Installation}
# Usage:
${data.Usage}
# Contributors: 
${data.Contributions}
# Tests: 
${data.Tests}
${createLicenseLink(data.license, data.Github)}
# Questions
 * GitHub Profile - https://github.com/${data.Github}
 * Email me at ${data.Email}
`;
}

// function to generate license badge
function createLicenseBadge(license) {
  if (license === "MIT") {
    return "[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)";
  } else if (license === "Apache--2.0") {
    return "[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)";
  } else if (license === "GPL v3.0") {
    return "[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)";
  } else {
    return "";
  }

  console.log(badge);
  // return badge;
}
// function to generate license link
function createLicenseLink(license, Github) {
  if (license === "MIT") {
    licenseLink = `[MIT](https://opensource.org/licenses/MIT)`;
    return `# License
${license} License
  Copyright (c) 2022 ${Github}
  Licensed under the ${licenseLink} License.`;
  }
  if (license === "GPLv3") {
    licenseLink = `[GPLv3](https://www.gnu.org/licenses/gpl-3.0.en.html)`;
    return `# License
${license} License
  Copyright (c) 2022 ${Github}
  Licensed under the ${licenseLink} License.`;
  }
  if (license === "Apache--2.0") {
    licenseLink = `[Apache-2.0](https://opensource.org/licenses/Apache-2.0)`;
    return `# License
${license} License
  Copyright (c) 2022 ${Github}
  Licensed under the ${licenseLink} License.`;
  } else {
    return "";
  }
}
