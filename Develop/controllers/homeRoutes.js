const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");


app.get("/user", (req, res) => {
    db.User.find({})
      .then(dbUser => {
        res.json(dbUser);
      })
      .catch(err => {
        res.json(err);
      });
  });
  