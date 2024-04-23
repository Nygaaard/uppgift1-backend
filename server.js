const express = require("express");
const cors = require("cors");
const mysql = require("mysql");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

//Connect to database
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

connection.connect((err) => {
  if (err) {
    console.log("Connection failed: " + err);
  }
  console.log("Connected to database");
});

app.use(cors());
app.use(express.json());

app.listen(port, () => {
  console.log("Server running on port: " + port);
});

//Routing
//Get
app.get("/api", (req, res) => {
  res.json({ message: "Welcome to my API" });
});

app.get("/api/workexperience", (req, res) => {
  //Get work experiences
  connection.query(`SELECT * FROM work_experience;`, (err, results) => {
    if (err) {
      res.status(500).json({ error: "Something went wrong: " + err });
      return;
    }

    console.log(results);
    if (results.length === 0) {
      res.status(404).json({ error: "No users found" });
    } else {
      res.json(results);
    }
  });
});

//Post
app.post("/api/workexperience", (req, res) => {
  let companyName = req.body.companyName;
  let jobTitle = req.body.jobTitle;
  let location = req.body.location;
  let startDate = req.body.startDate;
  let endDate = req.body.endDate;
  let description = req.body.description;

  //Handle error messages
  let errors = {
    message: "",
    detail: "",
    https_response: {},
  };

  if (
    !companyName ||
    !jobTitle ||
    !location ||
    !startDate ||
    !endDate ||
    !description
  ) {
    //Error messages
    errors.message = "Alla fält är inte ifyllda";
    errors.detail = "Du måste inkludera alla fält";

    //Response code
    errors.https_response.message = "Bad request";
    errors.https_response.code = 400;

    res.status(400).json(errors);
    return;
  }

  //Add user to database
  connection.query(
    `INSERT INTO work_experience(companyname, jobtitle, location, startdate, enddate, description) VALUES (?, ?, ?, ?, ?, ?);`,
    [companyName, jobTitle, location, startDate, endDate, description],
    (err, results) => {
      if (err) {
        res.status(500).json({ err: "Something went wrong: " + err });
        return;
      }

      console.log("query created: " + results);

      let workExperience = {
        companyName: companyName,
        jobTitle: jobTitle,
        location: location,
        startDate: startDate,
        endDate: endDate,
        description: description,
      };

      res.json({ message: "Work experience added", workExperience });
    }
  );
});

app.delete("/api/workexperience/:id", (req, res) => {
  let id = req.params.id;

  // Radera
  connection.query(
    `DELETE FROM work_experience WHERE id=?;`,
    [id],
    (err, results) => {
      if (err) {
        res.status(500).json({ error: "Something went wrong: " + err });
        return;
      }

      console.log("Work experience deleted: " + results.affectedRows);

      if (results.affectedRows === 0) {
        res.status(404).json({ error: "Work experience not found" });
        return;
      }

      res.json({ message: "Work experience deleted", id: id });
    }
  );
});
