const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const data = fs.readFileSync('./database.json');
const conf = JSON.parse(data);
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: conf.host,
  user: conf.user,
  password: conf.password,
  port: conf.port,
  database: conf.database
});
connection.connect();

const multer = require('multer');
const upload = multer({ dest: './upload' })//사용자의 파일이 업로드 되는 공간.

app.get('/api/user', (req, res) => {
  connection.query(
    'SELECT * FROM USER',
    (err, rows, fields) => {
      res.send(rows);
    }
  )
});

//이미지 폴더에서 사용자가 해당 직접 접근해서 profile 이미지 공유
app.use('/image', express.static('./upload'));

app.post('/api/user', upload.single('image'), (req, res) => {
  let sql = 'INSERT INTO USER VALUES (null, ?,?, ?, ?, null)';
  let email=req.body.email;
  let password=req.body.password;
  let name = req.body.name;
  let address=req.body.address;
  //let image = '/image/' + req.file.filename;

  let params = [email, password, name, address];
  connection.query(sql, params,
    (err, rows, fields) => {
      res.send(rows);
    }
  )
});

// app.delete('/api/user/:', (req, res) => {
//   let sql = 'UPDATE CUSTOMER SET isDeleted = 1 WHERE id = ?';
//   let params = [req.params.id];
//   connection.query(sql, params,
//     (err, rows, fields) => {
//       res.send(rows);
//     }
//   )
// });

app.get('/api/coronamap', (req, res) => {
  connection.query(
    'SELECT * FROM CORONAMAP',
    (err, rows, fields) => {
      res.send(rows);
    }
  )
});

app.listen(port, () => console.log(`Listening on port ${port}`));