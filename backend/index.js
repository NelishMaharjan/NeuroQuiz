const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.json('Hello World from Backend!');
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});