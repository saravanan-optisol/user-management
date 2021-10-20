const express = require('express'); 
const PORT = process.env.PORT || 5000;
const app = express();
const db = require('./config/db');

db.sync().then(() =>{
    console.log('db connected');
}).catch((err) =>{
    console.log('db err' + err)
})

app.get('/', (req, res) =>{
    res.send('hello opti')
})

app.listen(PORT, () =>{
    console.log('server running');
})