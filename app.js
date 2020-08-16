/**
 * EXPRESS Server Setup
 *
 */

const express = require("express");
const port = 9900;

// Express App
const app = express();

// Listen for requests
app.listen(port, () => {
  console.log(`app is running at http://localhost:${port}`);
});

// Static Files Middleware
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
