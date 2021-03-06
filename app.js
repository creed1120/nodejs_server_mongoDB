/*****************************************
 *     EXPRESS Server Setup
 *     Author: Cedric Reed
 *     Date: 8.16.2020
 ****************************************/

const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const Blog = require("./models/blog");

const port = 9900;

/************************
 *  Express App
 ************************/
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
    .catch((err) => {
      console.log(err);
    });
})();

/******************************
 *  Static Files and Middleware
 *****************************/
app.use(morgan("dev"));
// Except the Form Data from Create Blog Form
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

/******************************
 *  Register view engine
 *****************************/
app.set("view engine", "ejs");

/*********************************************************
 *  Mongoose and MongoDB sandbox routes for testing
 ********************************************************/

// Add a new blog
// app.get("/add-blog", (req, res) => {
//   const blog = new Blog({
//     title: "New Blog 2",
//     snippet: "About my new blog 2",
//     body: "More about my new added blog from the Schema",
//   });
//   blog
//     .save()
//     .then((result) => {
//       res.send(result);
//     })
//     .catch((error) => {
//       console.log(error);
//     });
// });

// Get ALL blogs
// app.get("/all-blogs", (req, res) => {
//   Blog.find()
//     .then((result) => {
//       res.send(result);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });

// Get a Single blog
// app.get("/single-blog", (req, res) => {
//   Blog.findById(`5f39c967be045911f913dd46`)
//     .then((result) => {
//       res.send(result);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });

/******************************
 *      Main Routes
 *****************************/
app.get("/", (req, res) => {
  //res.send("<h2>Home Page</h2>");

  res.render("index", {
    title: "Home",
  });
});

app.get("/about", (req, res) => {
  //res.send("<h2>About Page</h2>");
  res.render("about", {
    title: "About",
  });
});

/******************************
 *     Blog Routes
 *****************************/

// Get ALL Blogs from mongoDB
app.get("/blogs", (req, res) => {
  Blog.find()
    .sort({ createdAt: -1 })
    .then((result) => {
      res.render("blogs", {
        title: "All Blogs",
        blogs: result,
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

// Create Page w/ form
app.get("/blogs/create", (req, res) => {
  res.render("create", {
    title: "Create New Blog",
  });
});

// adds the data from the Create Blog Form to mongoDB on submit
app.post("/blogs", (req, res) => {
  const blog = new Blog(req.body);

  blog
    .save()
    .then((result) => {
      res.redirect("/blogs");
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/blogs/:id", (req, res) => {
  const id = req.params.id;

  Blog.findById(id)
    .then((result) => {
      res.render("details", {
        blog: result,
        title: "Blog Details",
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.delete("/blogs/:id", (req, res) => {
  const id = req.params.id;

  Blog.findByIdAndDelete(id).then((result) => {
    res.json({
      redirect: "/blogs",
    });
  });
});

/*******************************************************
 *   404 Error Middleware ( has to be at the bottom )
 ******************************************************/
app.use((req, res, next) => {
  res.status(404).render("404", {
    title: "404",
  });
});
