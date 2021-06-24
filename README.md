## Hello guys :)

### Long story short

The task was interesting enough. But at the same time, it was challenging. The most struggling thing is to set up all the things from scratch.

### A few words about my decisions during the implementation:

During the env setup, I was mainly focused on choosing fast and straightforward approaches, but at the same time, I was trying to maintain the quality on an acceptable level. Another thing - I did not set up the environment fully because it was not required and simply unneeded for the task.

#### UI

I was choosing between Antd and Material UI. Antd - required to use some workaround libs to style components correctly, less powerful API. Material UI won the race because of the faster setup and more obvious API for the consistent components.

#### Common components

For some of the `User projects` form components, I moved common folder `surfaces` as an example of how to split the things. Also, some big and logically divided parts I separate as well. I prefer using decomposition in my work, so I implemented a few components based on this approach.

#### Form hendling

As far a the React-final-form, Firmik, etc., usage was forbidden, I managed to implement an elementary variant on how we could manage form, including validation. How could we improve the solution? Fully refactor)) Joke. Or not. Anyway, there are a few things to upgrade. First of all, make the form field independent. Maybe share independence on a bit higher level to the `ProjectDetails.` Basically, it would help to avoid an indefinite amount of reloads on every change event triggering. Also would be nice to introduce a more extended way to handle the state of the form to be able to use within some `Field` components. These things are ok to play with, but on a commercial project, I would instead choose 3d-party lib in a case where the time is limited.

#### Store

I refused to use redux/mobx etc., because of overheads. Even if the form were on prod, I would choose to keep the state locally inside the form instead of using the global store. Probably context could be helpful. But in any case, I would use it in a pair with hooks.

#### Conclusion

Thanks for the opportunity :) Would be great to get some feedback from you. Have a good time!

#### **********************************************\*\*\*\***********************************************

## Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

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
