const express = require('express');
const router = express.Router();
const db = require('../../db/connection');

// GET route for parties table
router.get('/parties', (req,res) => {
    const sql = `SELECT * from parties`;
    db.query(sql, (err,rows) => {
        if (err) {
            res.status(500).json({error: err.message});
        }
        res.json({
            message: "success",
            data: rows
        });
    });
});

//GET route for parties based on ID
router.get('/party/:id', (req, res) => {
    const sql = `SELECT * FROM parties WHERE id = ?`;
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

//create delete route to remove party based on ID as param
router.delete('/party/:id', (req,res) => {
    const sql = `DELETE from parties where id = ?`;
    const params = [req.params.id];
    db.query(sql,params,(err,result) => {
        if(err) {
            res.status(400).json({error: err.message});
        } else if(!result.affectedRows) {
            res.json({
                message: 'Party Not Found!'
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

module.exports = router;