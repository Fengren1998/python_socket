# admin (PaperWork PH Microservice) 
Contains all the admin related code for the PaperWork PH System.

## Stack
### ReactJS
Our main frontend library. React makes developing much easier due to it enabling reusability of admin components, as well as built in state management.  
ReactJS Website: [https://reactjs.org/]

### Redux
Our state management library. Redux binds with React through `react-redux`. Redux makes tracking the admin logic much easier. API calls are done with `redux-saga` to ensure that our UI's state is also linked with our asynchronous request calls.

### ESLint
Our linter. This dictates how we format the code throughout our application to ensure that we have a clean and unified codebase.

### Material UI
A collection of fully functional components implementing Google's Material Design. (We don't have a graphics designer and dont want to spend all day coding CSS3).

## Configuration
Application Port: 4000  
This is the port used when the application is run on standalone without docker-compose.

Container Port: 4000
This is the port allocated when docker-compose is used to run the application.
