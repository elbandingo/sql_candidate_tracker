const express = require("express");
const app = express();
const PORT = process.env.PORT || 3005;
const mysql = require("mysql2");
const inputCheck = require('./utils/inputCheck');

//add the middleware
app.use(express.urlencoded({extended:true}));
app.use(express.json());
//connect the DB
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: '0Bother!!',
        database: 'election'
    },
    console.log('Connected to the election database')
);


// Get all candidates
app.get('/api/candidates', (req, res) => {
    const sql = `SELECT candidates.*, parties.name AS party_name from candidates left join parties on candidates.party_id = parties.id`;
  
    db.query(sql, (err, rows) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({
        message: 'success',
        data: rows
      });
    });
  });



// Get a single candidate
app.get('/api/candidate/:id', (req, res) => {
    const sql = `SELECT candidates.*, parties.name AS party_name from candidates left join parties on candidates.party_id = parties.id WHERE candidates.id = ?`;
    const params = [req.params.id];
  
    db.query(sql, params, (err, row) => {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
      res.json({
        message: 'success',
        data: row
      });
    });
  });

// Delete a candidate
app.delete('/api/candidate/:id', (req, res) => {
    const sql = `DELETE FROM candidates WHERE id = ?`;
    const params = [req.params.id];
  
    db.query(sql, params, (err, result) => {
      if (err) {
        res.statusMessage(400).json({ error: res.message });
      } else if (!result.affectedRows) {
        res.json({
          message: 'Candidate not found'
        });
      } else {
        res.json({
          message: 'deleted',
          changes: result.affectedRows,
          id: req.params.id
        });
      }
    });
  });

//create a candidate through POST
app.post('/api/candidate', ({body},res) => {
    const errors = inputCheck(body, 'first_name', 'last_name', 'industry_connected')
    if (errors) {
        res.status(400).json({error: errors});
        return;
    }
    const sql = `INSERT INTO candidates (first_name, last_name, industry_connected) VALUES (?,?,?)`;
    const params = [body.first_name, body.last_name, body.industry_connected];
    db.query(sql,params, (err,result) => {
        if (err) {
            res.status(400).json({error: err.message});
        }
        res.json({
            message: 'success',
            data: body
        });
    });
});

//query for creating a candidate with params
//const sql = `INSERT INTO candidates (id,first_name,last_name,industry_connected)
//                VALUES (?,?,?,?)`;
//const params = [1,'Ronald', 'Firbank', 1];

//db.query(sql, params, (err, result) => {
//   if(err){
//        console.log(err);
//    }
//    console.log(result);
//})


//listen for any url to be bad, give a 404
app.use((req,res) => {
    res.status(404).end();
});










//start the server
app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
});