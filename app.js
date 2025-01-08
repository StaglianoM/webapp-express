const express = require('express');
const app = express();
const port = 3000;
const notFound = require('./middlewares/notFound');
const errorsHandler = require('./middlewares/errorsHandler');


//middleware static public
app.use(express.static('public'))

//rotta get di root
app.get('/', (req, res) => {
    res.send('server connesso')
})

//Middlewares
app.use(errorsHandler)
app.use(notFound)

//connessione alla port 3000
app.listen(port, () => {
    console.log(`server connesso port ${port}`)
})