const {Client} = require("pg");

const clientPostgres = new Client({
    user: 'ankit',
    host: 'localhost',    
    database: 'learning',
    password: '',
    port: 5433, 
})

clientPostgres.connect().then(() => {
    console.log('Connected to PostgreSQL database!');
}).catch(err => {
    console.error('Connection error', err.stack);
});

module.exports = clientPostgres