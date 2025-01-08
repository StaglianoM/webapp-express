const mysql = require('mysql2')

const connection = mysql.createConnection({

    host: 'localhost',
    user: 'root',
    password: 'XXXXX',
    database: 'movies_db'
})

connection.connect((err) => {
    if (err) throw err

    console.log('Connesso a MYSQL')
})

module.exports = connection