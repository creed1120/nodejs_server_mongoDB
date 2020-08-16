/**
 * EXPRESS Server Setup
 *
 */

const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");

const port = 9900;

// Express App
const app = express();
const dbURI = `mongodb+srv://creed1120:F00tb@ll1120@expressserver.ffxur.gcp.mongodb.net/express_server?retryWrites=true&w=majority`;

(async () => {
  await mongoose
    .connect(dbURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((result) => {
      // Listen for requests
      app.listen(port, () => {
        console.log(`app is running at http://localhost:${port}`);
      });
      console.log("Connected to database Successfully!");
    })
    .catch((error) => {
      console.log("Connection Error");
    });
})();

// Static Files Middleware
app.use(morgan("dev"));
app.use(express.static("public"));

// Register view engine
app.set("view engine", "ejs");

// Routes
app.get("/", (req, res) => {
  //res.send("<h2>Home Page</h2>");

  const blogs = [
    {
      title: "Yoshi finds eggs",
      snippet: "Lorem ipsum dolor sit amet consectetur, adipisicing elit.",
    },
    {
      title: "Mario finds stars",
      snippet: "Lorem ipsum dolor sit amet consectetur, adipisicing elit.",
    },
    {
      title: "Save the world",
      snippet: "Lorem ipsum dolor sit amet consectetur, adipisicing elit.",
    },
  ];

  res.render("index", {
    title: "Home",
    blogs,
  });
});

app.get("/about", (req, res) => {
  //res.send("<h2>About Page</h2>");
  res.render("about", {
    title: "About",
  });
});

app.get("/blogs/create", (req, res) => {
  res.render("create", {
    title: "Create New Blog",
  });
});

// 404 Error Middleware ( has to be at the bottom )
app.use((req, res, next) => {
  res.status(404).render("404", {
    title: "404",
  });
});
