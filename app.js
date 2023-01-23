const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const port = process.env.port || 3000;

mongoose.set("strictQuery", false);
mongoose.connect("mongodb://127.0.0.1:27017/todolistDB", { useNewUrlParser: true });
const genSchema = new mongoose.Schema({ name : String });
const workSchema = new mongoose.Schema({ name : String });
const General = mongoose.model("General", genSchema);
const Work = mongoose.model("Work", workSchema);

function getGeneral() {
    let item = [];
    General.find(null, {name:1},(err, data)=>{
        if(err){
          console.log(err);
        } else {
            data.forEach(element => {
                item.push(element.name);
            });
        }
    });
    return item;
};
function getWork() {
    let item = [];
    Work.find(null, {name:1},(err, data)=>{
        if(err){
          console.log(err);
        } else {
            data.forEach(element => {
                item.push(element.name);
            });
        }
    });
    return item;
};

function setGeneral(n) {
    General.insertOne({ name : n }).then(function(){
        console.log("Data inserted")  // Success
    }).catch(function(error){
        console.log(error)      // Failure
    });
};
function setWork(n) {
    Work.insertOne({ name : n }).then(function(){
        console.log("Data inserted")  // Success
    }).catch(function(error){
        console.log(error)      // Failure
    });
};

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
    res.render("index", { title: currTitle, list: getGeneral() });
});
app.post("/", (req, res) => {
    if (req.body.btn == "Work") {
        setWork(req.body.item);
        res.redirect("/work");
    } else {
        setGeneral(req.body.item);
        res.redirect("/");
    }
});
app.get("/work", (req, res) => {
    currTitle = "Work List";
    res.render("index", { title: currTitle, list: getWork() });
});

app.listen(port, () => {
    console.log("listening "+port);
});