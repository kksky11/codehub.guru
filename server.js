
const express = require('express');
const path = require('path'); 
const app = express();
let port = process.env.PORT || 80;

app.use(express.static(path?.join(__dirname, './dist')));
app.get('/*',function (req, res) {res.sendFile(path?.join(__dirname, './dist', './index.html'))});
app.listen(port, () => console.log('server started on port  ' + port));