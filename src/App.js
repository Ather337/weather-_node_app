const express = require("express");
const path = require("path");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const weather = require("./utils/weather");

//paths for express
const dirPath = path.join(__dirname, "../public");
const partialPath = path.join(__dirname, "../templates/partials");
//start express
const App = express();
App.use(express.static(dirPath));
//Handlebars settings
App.set("view engine", "hbs");
App.set("views", "templates/views");
hbs.registerPartials(partialPath);
App.get("", (req, res) => {
  res.render("index", {
    title: "Home of Elizabeth",
    author: "Athar",
  });
});
App.get("/about", (req, res) => {
  res.render("about", {
    Title: "About Athar",
    author: "Athar",
  });
});
App.get("/weather", (req, res) => {
  //here we will find geocode first then we will find its weather and send it to browser
  geocode(req.query.search, (error, data) => {
    //callback to implement weather finding...
    weather(data, (e, data) => {
      if (e) {
        return res.send(e);
      } else {
        return res.send(data);
      }
    });
  });
});
App.get("/help", (req, res) => {
  res.send("Help");
});
App.get("/help/*", (req, res) => {
  res.render("404", {
    errorMsg: "Help article not found.",
  });
});
App.get("/*", (req, res) => {
  res.render("404", {
    errorMsg: "Page not found.",
  });
});

App.listen(3000, () => console.log("Server Started on port 3000"));
