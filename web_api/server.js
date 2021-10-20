const express = require('express'); 
const PORT = process.env.PORT || 5000;
const app = express();
const db = require('./models/');

app.get('/', (req, res) =>{
    res.send('hello opti')
})

db.sequelize.sync().then(() =>{
    app.listen(PORT, () => console.log('server running'));
}).catch((err) =>{
    console.log('db err' + err)
})