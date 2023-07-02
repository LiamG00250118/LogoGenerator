const inquirer = require('inquirer');
const fs = require('fs');


let text = '';
let color = '';
let shape = '';

function promptUserText() {
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
      promptUserRest();
    } else {
      console.log("Text is longer than 3 characters. Please try again.");
      promptUserText();
    }
  });
}

function promptUserRest() {
    inquirer.prompt([
        {  
            type: 'input',
            name: 'color',
            message: "Select a color: (enter keyword or hex code"
        },
        {  
            type: 'list',
            name: 'shape',
            choices: ['circle', 'triangle', 'square'],
            message: "Select a shape: "
        },
    ]
    ).then((answers) => {
        color = answers.color;
        shape = answers.shape;
        svgGenerator();
    })
}

function svgGenerator() {

    let svgFile = '';

    if(shape == 'square') {
    svgFile = `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200">
    <rect width="200" height="200" fill="${color}" />
    <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="white" font-size="48">${text}</text>
  </svg>`;  
    } else if (shape == 'circle')
    {
    svgFile = `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200"> <circle cx="50%" cy="50%" r="50%" fill="${color}" /> 
    <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="white" font-size="48">${text}</text>
  </svg>`;
    } else if (shape === 'triangle') {
        svgFile = `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200">
          <polygon points="100,10 00,198 230,198" fill="${color}" />
          <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="white" font-size="48">${text}</text>
        </svg>`;
      }

    fs.writeFile('logo.svg', svgFile, (err) => {
    if (err) { throw error;
    } else {
      console.log('Completed');
    }
  })
}




promptUserText()

