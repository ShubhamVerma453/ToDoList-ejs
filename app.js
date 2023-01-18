const express = require("express");
const bodyParser = require("body-parser");

let items = [];

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: "true" }));
app.use(express.static("public"));

app.get("/", (req, res) => {
    let date = new Date();
    let option= {
        weekday : "long",
        day : "numeric",
        month : "long"
    }
    let day = date.toLocaleDateString("en-US", option);
    res.render("index", { title: day, list: items});
});

app.post("/", (req, res)=>{
    items.push( req.body.item);
    res.redirect("/");
});

app.listen(3000, () => {
    console.log("listening");
});