const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mysql = require("mysql2");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());
const port = 3000;

app.set("view engine", "ejs");

//Set Up my SQL connection
async function connectToMySql() {
  const connection = await mysql.createConnection({
    host: "localhost",
    port: 3307,
    user:"root",
    password: "pass123",
    database: "testddb",
  });
  return connection;
}

let db ;
async ()=>{
    
}