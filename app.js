const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const request = require("request");
let charSearch = {
    server: "wyrmrest-accord",
    name: "Senran"
};

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.get("/", function(req, res){
    request('https://us.api.battle.net/wow/character/'+ charSearch.server +'/' + charSearch.name + '?locale=en_US&apikey=adnc8dd933q95ppwfdtqz7637dcztjt7', function(err, response, body){
        if(!err && response.statusCode == 200 ){
            var info = JSON.parse(body);
            console.log(info);
            res.render("main", {char:info});
        }
    });
});

app.post("/", function(req, res){
    charSearch = {
        server: req.body.server,
        name: req.body.name
    };
    console.log(charSearch.name + " " + charSearch.server);
    res.redirect('back');
})



app.listen(3000, function(){
    console.log("Blizz api test is running on 3000.");
})