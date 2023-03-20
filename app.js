const express = require('express')
var mysql = require('mysql');

const app = express()
const port = 3000
const IP = require('ip');
var con = mysql.createConnection({
    host: "azola.c1o3nmc6aylm.ap-southeast-1.rds.amazonaws.com",
    user: "admin",
    password: "abcd123456",
    database: "azola"
  });
var count = 0;
app.use('/scripts', express.static('scripts'));
app.get('/', (req, res) => {
     
    const ipAddress = IP.address();
    con.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");
        var sql = "INSERT INTO ip (name) VALUES ('"+ipAddress+"')";
        con.query(sql, function (err, result) {
          if (err) throw err;
          sql = "SELECT COUNT(*) AS namesCount FROM ip"; 
          con.query(sql, function (err, result) {
            if (err) throw err; 
            count = result[0].namesCount
            res.send("<!DOCTYPE html><html lang=\"en\"><head><meta charset=\"UTF-8\"><script src=\"https://d2pue2m8dbdyzk.cloudfront.net/jquery.min.js\"></script><title>visit + " + count + " - ip: "+ipAddress+"</title></head><body><input type=\"button\" value=\"Get remote ip\" onclick='alert($(\"title\").text())'></body></html>")
          });
        });
      });
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
