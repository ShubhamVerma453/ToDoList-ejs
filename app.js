const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: "true" }));

app.get("/", (req, res) => {
    let date = new Date();
    let option= {
        weekday : "long",
        day : "numeric",
        month : "long"
    }
    let day = date.toLocaleDateString("en-US", option);
    res.render("index", { ejs: day});
});

app.listen(3000, () => {
    console.log("listening");
});