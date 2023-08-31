const express = require('express');
const mysql = require('mysql');

const app = express();

const config = {
  host: 'db',
  user: 'root',
  password: 'root',
  database: 'nodedb',
};

const connection = mysql.createConnection(config);

const create_table = 'CREATE TABLE IF NOT EXISTS people (id int NOT NULL AUTO_INCREMENT PRIMARY KEY, name varchar(255) NOT NULL) ENGINE=InnoDB DEFAULT CHARSET=utf8;'
connection.query(create_table);

app.get('/', (req,res) => {
  const name = 'Eduardo';
  const sqlInsert = `INSERT INTO people(name) values('${name}')`;
    
  connection.query(sqlInsert);
  console.log(`${name} inserido no banco!`);

  const sqlGet = `SELECT id, name FROM people`;  
  
  connection.query(sqlGet, (error, results, fields) => {
    if (error) {
      throw error
    };
    
    let table = '<table>';
    table += '<tr><th>#</th><th>Name</th></tr>';
    for(let people of results) {      
      table += `<tr><td>${people.id}</td><td>${people.name}</td></tr>`;
    }

    table += '</table>';    
    res.send('<h1>Full Cycle Rocks!</h1>' + table);    
  });
});

const port = 3000;
app.listen(port, () => {
  console.log(`server started in port ${port}`);
});

