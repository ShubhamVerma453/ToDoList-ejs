const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const port = process.env.port || 3000;

mongoose.set("strictQuery", false);
mongoose.connect("mongodb://127.0.0.1:27017/todolistDB", { useNewUrlParser: true });
const genSchema = new mongoose.Schema({ name : String });
const workSchema = new mongoose.Schema({ name : String });
const General = mongoose.model("General", genSchema);
const Work = mongoose.model("Work", genSchema);


const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: "true" }));
app.use(express.static("public"));

app.get("/", (req, res) => {
    
    let date = new Date();
    let option = {
        weekday: "long",
        day: "numeric",
        month: "long"
    }
    let currTitle = date.toLocaleDateString("en-US", option);
    res.render("index", { title: currTitle, list: items });
});
app.post("/", (req, res) => {
    if (req.body.btn == "Work") {
        work.push(req.body.item);
        res.redirect("/work");
    } else {
        items.push(req.body.item);
        res.redirect("/");
    }
});
app.get("/work", (req, res) => {
    currTitle = "Work List";
    res.render("index", { title: currTitle, list: work });
});

app.listen(port, () => {
    console.log("listening "+port);
});