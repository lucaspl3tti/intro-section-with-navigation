# Basic Frontend IDE 2022
My current personal frontend test and development environment. It is based on Gulp, TypeScript/JS, ES6+ and SCSS.

## Installation Instructions
1. Initialize a new repo from the [template repo](https://github.com/lucaspl3tti/basic-frontend-ide)
2. Clone the new repo with `git clone https://github.com/lucaspl3tti/<Repo Path>.git` to your desktop
   * use `git clone git@github.com:lucaspl3tti/<Repo Path>.git` if you are using git with ssh
4. Amend package.json file to new project and specify:
    * `name` - Name of the new project
    * `version` - Current Version of the new project
    * `description` - Description of the new project
    * `repository` - Repository Information of the new project
    * `homepage` - Link to the homepage or repo of the new project
5. Run an installation of the package dependencies using `npm i`

## Commands
`npm run dev` run this command to build the app in dev mode and initialize a dev server with hot reload.

`npm run build` run this command to simply build the app in dev mode

`npm run prod` run this command to build the app in production mode

`npm run lint:scss` run this command to lint over all scss files

`npm run lint:js` run this command to lint over all js files

## TypeScript
To use TypeScript just change the variable "useTypeScript" in the gulpfile's script function to true (default is false)

`const useTypeScript = true;`
