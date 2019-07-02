const express = require('express');
const postsRouter = require('./routes/postsRouter');

const app = express();
require('./database')();

app.use('/api/posts', postsRouter);

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Listening on port ${port}...`)
});
