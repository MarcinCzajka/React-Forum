const express = require('express');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const loginRouter = require('./routes/loginRouter');
const userRouter = require('./routes/userRouter');
const forumRoomRouter = require('./routes/forumRoomRouter');
const postsRouter = require('./routes/postsRouter');

const app = express();
require('./config/database')();

app.enable('strict routing')

app.use(helmet());

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/login', loginRouter);
app.use('/api/users', userRouter);
app.use('/api/rooms', forumRoomRouter);
app.use('/api/posts', postsRouter);

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Listening on port ${port}...`)
});
