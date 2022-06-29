//core module
const fs = require('fs');
const inquirer = require('inquirer');
//local module
const generatePage = require('./src/page-template');


const promptUser = () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is your name? (Required)',
            validate: nameInput => {
              if (nameInput) {
                return true;
              } else {
                console.log('Please enter your name!');
                return false;
              }
            }
          },
      {
        type: 'input',
        name: 'github',
        message: 'Enter your GitHub Username (Required)',
        validate: githubInput => {
            if (githubInput) {
              return true;
            } else {
              console.log('Please enter GitHub Username!');
              return false;
            }
          }
      },
      {
        type: 'confirm',
        name: 'confirmAbout',
        message: 'Would you like to enter some information about yourself for an "About" section?',
        default: true
      },
      {
        type: 'input',
        name: 'about',
        message: 'Provide some information about yourself:',
        when: ({ confirmAbout }) => {
          if (confirmAbout) {
            return true;
          } else {
            return false;
          }
        }
      },
      {
        type: 'input',
        name: 'about',
        message: 'Provide some information about yourself:'
      }
    ]);
  };

//Project questions
const promptProject = portfolioData =>{  
     console.log(`
=================
Add a New Project
=================
`);

    // If there's no 'projects' array property, create one
if (!portfolioData.projects) {
    portfolioData.projects = [];
  }
 
    return inquirer.prompt([
      {
        type: 'input',
        name: 'name',
        message: 'What is the name of your project (Required)?',
        validate: projectNameInput => {
            if (projectNameInput) {
              return true;
            } else {
              console.log('Please enter name of your project!');
              return false;
            }
          }
      },
      {
        type: 'input',
        name: 'description',
        message: 'Provide a description of the project (Required)',
        validate: projectDescriptionInput => {
            if (projectDescriptionInput) {
              return true;
            } else {
              console.log('Please enter description of the project!');
              return false;
            }
          }
        
      },
      {
        type: 'checkbox',
        name: 'languages',
        message: 'What did you build this project with? (Check all that apply)',
        choices: ['JavaScript', 'HTML', 'CSS', 'ES6', 'jQuery', 'Bootstrap', 'Node']
      },
      {
        type: 'input',
        name: 'link',
        message: 'Enter the GitHub link to your project. (Required)',
        validate: githubLinkInput => {
            if (githubLinkInput) {
              return true;
            } else {
              console.log('Please enter GitHub link!');
              return false;
            }
          }
        
      },
      
      {
        type: 'confirm',
        name: 'feature',
        message: 'Would you like to feature this project?',
        default: false
      },
      {
        type: 'confirm',
        name: 'confirmAddProject',
        message: 'Would you like to enter another project?',
        default: false
      }
    ])
    .then(projectData => {
        portfolioData.projects.push(projectData);
        if (projectData.confirmAddProject) {
          return promptProject(portfolioData);
        } else {
          return portfolioData;
        }
      });
  };
// const mockData = {
//   name: 'Lernantino',
//   github: 'lernantino',
//   projects: []
// }
  promptUser()
  .then(promptProject)
  .then(portfolioData => {
    const pageHTML = generatePage(portfolioData);
// const pageHTML = generatePage(mockData);

    //writes the html file
     fs.writeFile('./index.html', pageHTML, err => {
      if (err) throw new Error(err);

      console.log('Page created! Check out index.html in this directory to see it!');
    });
  });

