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

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: "true" }));
app.use(express.static("public"));

async function getGeneral() {
    let item = [];
    await General.find(null, {name:1},(err, data)=>{
        if(err){
          console.log(err);
        } else {
            data.forEach(element => {
                item.push(element.name);
            });
        }
        return item;
    }).clone().catch(function(err){ console.log(err)});
    console.log("in fun  "+item);
    return item;
};
async function getWork() {
    let item = [];
    await Work.find(null, {name:1},(err, data)=>{
        if(err){
          console.log(err);
        } else {
            data.forEach(element => {
                item.push(element.name);
            });
        }
    }).clone().catch(function(err){ console.log(err)});
    return item;
};

function setGeneral(n) {
    console.log(n);
    General.insertMany([{ name : n }], (err, data)=>{
        if(err)
            console.log(err);
        else
            console.log(data);
    });
};
function setWork(n) {
    Work.insertMany([{ name : n }]).then(function(){
        console.log("Data inserted")  // Success
    }).catch(function(error){
        console.log(error)      // Failure
    });
};

app.get("/", (req, res) => {
    
    let date = new Date();
    let option = {
        weekday: "long",
        day: "numeric",
        month: "long"
    }
    let currTitle = date.toLocaleDateString("en-US", option);
    let listItem = getGeneral();
    console.log("here i need "+listItem);
    res.render("index", { title: currTitle, list: listItem});
});
app.post("/", (req, res) => {
    console.log(req.body.item);
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
    let listItem = getWork();
    console.log("in work "+listItem);
    res.render("index", { title: currTitle, list: listItem});
});

app.listen(port, () => {
    console.log("listening "+port);
});