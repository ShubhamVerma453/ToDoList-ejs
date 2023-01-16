const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: "true" }));

app.get("/", (req, res) => {
    let date = new Date();
    let dayNo = date.getDay();
    let day;
    switch (dayNo) {
        case 0:
            day = "Sunday";
            break;
        case 1:
            day = "Monday";
            break;
        case 2:
            day = "Tuesday";
            break;
        case 3:
            day = "Wednesday";
            break;
        case 4:
            day = "Thursday";
            break;
        case 5:
            day = "Friday";
            break;
        case 6:
            day = "Saturday";
            break;
        default:
            break;
    }
    res.render("index", { ejs: day});
});

app.post("/", (req, res)=>{
    console.log(req.body.item)
});

app.listen(3000, () => {
    console.log("listening");
});