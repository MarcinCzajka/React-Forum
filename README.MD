# React-forum

React based forum/dashboard with REST API in Node.js/Express.js

Project written purely to master React and Node.js. I've chosen forum formula because it requires good ux
and secure backend to be viable and those are the things i wanted to work on.

## Live Demo on Heroku

[React-forum on heroku](https://reactive-forum.herokuapp.com/)

It actually might take Heroku a while before it loads resources and launch as it dont keep apps at memory all the time.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Installing

A step by step series of examples that tell you how to get a development env running

Clone repository to local machine

```
git clone https://github.com/MarcinCzajka/React-Forum.git
cd react-forum
```

Install both client and server dependencies

```
npm run i-all
```

Run app

```
npm start
```

## Key Features

```
Frontend:
* Fully responsive design
* Single-page design with React-Router to provide exact URL and browsing history
* Placeholders and loaders in places that might require longer loading
```
```
Backend:
* REST API
* MongoDB database
* Token based Authentication/Autorization
```

## Built With

* [create-react-app](https://github.com/facebook/create-react-app/) - The web framework used
* [Semantic ui](https://react.semantic-ui.com/) - UI framework
* [express.js](https://github.com/expressjs/express/) - Server framework
* [MongoDB](https://www.mongodb.com/) - Database provider
* [mongoose](https://github.com/Automattic/mongoose/) - Used for object modelling for MongoDB
* [axios](https://github.com/axios/axios/) - Used for HTTP requests

## Authors

* **Marcin Czajka** - [Github](https://github.com/MarcinCzajka)

## License

This project is licensed under the MIT License
