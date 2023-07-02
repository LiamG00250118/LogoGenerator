const inquirer = require('inquirer');


let text = '';

function promptUser() {
  inquirer.prompt([
    {
      type: "input",
      name: "text",
      message: "Please enter a 3 letter logo name",
    }
  ])
  .then((answers) => {
    text = answers.text;
    if (text.length <= 3) {
      console.log(text);
    } else {
      console.log("Text is longer than 3 characters. Please try again.");
      promptUser(); // recursively call the prompt function
    }
  });
}

promptUser(); // start the prompt