# Health Diseases Prediction and Monitoring Platform (Prediction based on Patient Symptoms Analysis)

In this web application, I am doing health diseases prediction based on patient symptoms analysis.
The application is builded using ReactJs library for the web client, Postgresql as DBMS, Flask as Framework and SqlAlchemy as ORM.

The application has three type of profiles which are the general manager, the Medical Doctor, and the Patient.

When the application is launched, we access the Login page. Here the login page can be used for the different types of profiles we have and depending on their role, they are redirected to their respectively dashboard.

To be able to access the dashborad, all the users have to be registered, for this the medical doctor and patient have the form where the can register while the General manager information are saved in the database already.

When the medical doctor register, he cannot yet able to access his dashboard until the general manager has check his profil (Documents, information) and validate it.
When the patient register, he can directly access his dashboard and start to use the application.

Concerning the general manager, he will be in charge to manage the application. So he will be able to link patient and medical doctor, validate medical doctor account, deactivate both patients and medical doctors in case they don't respect the policy of the application, etc.

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)


# Flask API setting
If python already installed in your computer, open the api folder and create your vitual environment by run the command << python3 -m venv <virtual_environment_name> >> (Here we are on linux OS).

Then you activate your virtual environment by running <<virtual_environment_name>>/bin/activate.

Next you install Flask by running <<pip install Flask>>.
  
You can now install the requirement libaries by running <<pip install -r requirements.txt>>
  
Now our Flask application is ready to launch.

Now we are running the database migrations, for it, we will do the following:

>flask db init

>flask db migrate -m "Initial migration"

>flask db upgrade

Now that our database has been migrated successfully, we can now launch the application by running the command <<flask run>>

As a DBMS I used Postgrsql
