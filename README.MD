# React-forum

React based forum/dashboard with REST API written in Node.js/Express.js and MongoDB

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

Frontend:
* Fully responsive design
* Single-page with React-router to provide exact url
* Placeholders and loaders in places that require extended loading
* Recursive comments

Backend:
* REST API
* MongoDB database
* Token based Authorization/Authentication (jwt)


## Built With

* [create-react-app](https://github.com/facebook/create-react-app/) - The web framework used
* [Semantic UI](https://react.semantic-ui.com/) - UI framework
* [express.js](https://github.com/expressjs/express/) - Server framework
* [MongoDB](https://www.mongodb.com/) - Database provider
* [mongoose](https://github.com/Automattic/mongoose/) - Used for object modelling for MongoDB
* [axios](https://github.com/axios/axios/) - Used for HTTP requests

## Authors

* **Marcin Czajka** - [Github](https://github.com/MarcinCzajka)

## License

This project is licensed under the MIT License