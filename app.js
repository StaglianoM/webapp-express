const express = require('express');
const app = express();
const port = 3000;


//rotta get di root
app.get('/', (req, res) => {
    res.send('server connesso')
})

//connessione alla port 3000
app.listen(port, () => {
    console.log(`server connesso port ${port}`)
})