const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const port = process.env.port || 3000;

mongoose.set("strictQuery", false);
mongoose.connect("mongodb://127.0.0.1:27017/todolistDB", { useNewUrlParser: true });
const genSchema = new mongoose.Schema({ name : String, type : String });
const General = mongoose.model("General", genSchema);

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: "true" }));
app.use(express.static("public"));

async function getData() {
    let item = [];
    await General.find(null, {name:1},(err, data)=>{
        if(err){
          console.log(err);
        } else {
            data.forEach(element => {
                item.push(element);
            });
        }
    }).clone().catch(function(err){ console.log(err)});
    // console.log("in fun  "+item);
    return item;
};
async function getWork() {
    let item = [];
    await Work.find(null, {name:1},(err, data)=>{
        if(err){
          console.log(err);
        } else {
            data.forEach(element => {
                item.push(element);
            });
        }
    }).clone().catch(function(err){ console.log(err)});
    return item;
};

function setData(n, t) {
    console.log(t + " "+n);
    General.insertMany([{ name : n, type:t }], (err, data)=>{
        if(err)
            console.log(err);
        else
            console.log(data);
    });
};

app.get("/", async (req, res) => {
    let date = new Date();
    let option = {
        weekday: "long",
        day: "numeric",
        month: "long"
    }
    let currTitle = date.toLocaleDateString("en-US", option);
    let listItem = await getData();
    console.log("here i need "+listItem);
    // res.render("index", { title: currTitle, list: listItem, listType:"general"});
    res.render("index", { title: currTitle, list: listItem});
});
app.get("/work", async (req, res) => {
    currTitle = "Work List";
    let listItem = await getData();
    // console.log("in work "+listItem);
    res.render("index", { title: currTitle, list: listItem, listType:"work"});
});
app.post("/", (req, res) => {
    console.log(req.body.item);
    if (req.body.btn == "Work") {
        setData(req.body.item, "work");
        res.redirect("/work");
    } else {
        setData(req.body.item, "general");
        res.redirect("/");
    }
});

app.post("/delete", (req, res)=>{
    console.log(req.body.item);
    res.redirect("/");
})

app.listen(port, () => {
    console.log("listening "+port);
});