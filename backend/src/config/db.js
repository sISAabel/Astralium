const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'sisabel',
  database: 'astralium'
});

connection.connect((error) => {
  if (error) {
    console.error('Error conectando a MySQL:', error);
    return;
  }

  console.log('Conectado a MySQL');
});

module.exports = connection;