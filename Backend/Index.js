const express = require('express');
const app = express();
const port = 3000;

const photographersData = require('./potographers.json');


app.get('/api/photographers', (req, res) => {
    res.json(photographersData);
});
app.get('/api/photo', (req, res) => {
    res.send(
         vivek={
            hello:"ji",

        }
        );
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
