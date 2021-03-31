# group-arrangement
Group 1 of Software Studio 2A

Team Members:
- Varun
- Patrice
- Davit
- Yunwei
- Etta
- Kenneth
- Jeffrey

## Setup and Configuration

1) Pull repo and navigate to repo
2) Ensure Yarn is installed by running `yarn --version` and then run `yarn` to install all missing packages
3) Start a Postgres server on your machine, either throught brew or through the [Postgres app](https://postgresapp.com/)
4) Create the database by running ./scripts/database_setup.sh
5) Run `npx sequelize-cli db:migrate` to run all pending migrations. [Reference](https://sequelize.org/master/manual/migrations.html)

## Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn dev`

Runs the app in the development mode.\
Open [http://localhost:6060](http://localhost:6060) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

It will also start the React app on [http://localhost:3000](http://localhost:3000). \
Use this link to view the application.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

