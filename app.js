const inquirer = require('inquirer');
const{writeFile,copyFile} = rqeuire('./utils/generate-site.js');
const generatePage = require('./src/page-template')

// const pageHTML = generatePage(name,github);

// fs.writeFile('./index.html', pageHTML, err => {
//     if (err) throw err;
//     console.log('Portfolio complete! Check out index.html to see the output!');
// });
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
        message: 'Enter your GitHub Username',
        validate: gitHubUser => {
            if (gitHubUser) {
                return true;
            } else {
                console.log('Please enter your github username!')
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
        message: 'Provide some information about yourself: ',
        when: ({confirmAbout}) => {
            if (confirmAbout) {
                return true;
            } else {
                return false;
            }
        }
      }
    ]);
};

const promptProject = portfolioData => {
    //if there's no 'projects' array property, create one
    if (!portfolioData.projects) {
        portfolioData.projects=[];
    }

    console.log(`
    =================
    ADD A NEW PROJECT
    =================
    `);
    return inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is the name of your project?'
        },
        {
            type: 'input',
            name: 'description',
            message: 'Provide a description of the project (Required)',
            validate: projectDescription => {
                if (projectDescription) {
                    return true;
                } else {
                    console.log('Please describe your project briefly!')
                }
            }
        },
        {
            type: 'checkbox',
            name: 'languages',
            message: 'What did you buidl this project with? (Check all that apply)',
            choices: ['Javascript', 'HTML', 'CSS', 'ES6', 'jQuery', 'Bootstrap', 'Node']
        },
        {
            type: 'input',
            name: 'link',
            message: 'Would you like to feature this project?',
            default: false,
            validate: confirmLink => {
                if (confirmLink) {
                    return true;
                } else if (!confirmLink) {
                    return false;
                } else {
                    console.log('Please indicate true or false.')
                }
            }
        },
        {
            type: 'confirm',
            name: 'confirmAddProject',
            mesage: 'Would you like to enter another project?',
            default: false
        }
    ])
    .then(projectData => {
        portfolioData.projects.push(projectData);
        if (projectData.confirmAddProject) {
            return promptProject (portfolioData);
        } else {
            return portfolioData
        }
    })
};

promptUser()
    .then(promptProject)
    .then(portfolioData => {
        return generatePage(portfolioData);
    })
    .then(pageHtml => {
        return writeFile(pageHtml);
    })
    .then(writeFileResponse=>{
        console.log(writeFileResponse);
        return copyFile();
    })
    .then(copyFileResponse => {
        console.log(copyFileResponse);
    })
    .catch(err=>{
        console.log(err);
    })

