const express = require("express");
const bodyParser = require("body-parser");

let items = [];
let work = [];

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
        console.log("work");
        work.push(req.body.item);
        res.redirect("/work");
    } else {
        console.log("item");
        items.push(req.body.item);
        res.redirect("/");
    }
});
app.get("/work", (req, res) => {
    currTitle = "Work List";
    res.render("index", { title: currTitle, list: work });
});

app.listen(3000, () => {
    console.log("listening");
});