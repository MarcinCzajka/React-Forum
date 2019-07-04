const express = require('express');
const postsRouter = require('./routes/postsRouter');
const userRouter = require('./routes/userRouter');

const app = express();
require('./config/database')();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/posts', postsRouter);
app.use('/api/users', userRouter);

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Listening on port ${port}...`)
});
