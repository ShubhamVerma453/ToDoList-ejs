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
    await General.find(null, (err, data)=>{
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

function setData(n, t) {
    // console.log(t + " "+n);
    General.insertMany([{ name : n, type:t }], (err)=>{
        if(err)
            console.log(err);
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
    // console.log("here i need "+listItem);
    res.render("index", { title: currTitle, list: listItem, listType:"general"});
});
app.get("/work", async (req, res) => {
    currTitle = "Work List";
    let listItem = await getData();
    res.render("index", { title: currTitle, list: listItem, listType:"work"});
});
app.post("/", (req, res) => {
    // console.log(req.body.item);
    if (req.body.btn == "Work") {
        setData(req.body.item, "work");
        res.redirect("/work");
    } else {
        setData(req.body.item, "general");
        res.redirect("/");
    }
});

app.post("/delete", async (req, res)=>{
    // console.log(req.body.item);
    let type;
    await General.findOne({_id:req.body.item}, (err, data)=>{
        if(err){
          console.log(err);
        } else {
            type = data.type;
        }
    }).clone().catch(function(err){ console.log(err)});

    await General.deleteOne({_id : req.body.item});

    // console.log("type = "+type);
    if(type == "work")
        res.redirect("/work");
    else
        res.redirect("/");
})

app.listen(port, () => {
    console.log("listening "+port);
});