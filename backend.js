/**
 * Created by AYUSH on 1/11/2017.
 */

var express=require("express"),
    app=express(),
    bodyParser=require("body-parser")
    mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/bb");

var bbSchema=new mongoose.Schema({
    name:String,
    username:String,
    password:String,
    email:String
});


var newacc =mongoose.model("bbl",bbSchema);



app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());



app.get("/",function (req,res) {

    res.render("website.ejs");


});



app.get("/create",function(req,res) {

    res.render("create.ejs")
    });

app.get("/login",function(req,res){
res.render("login.ejs",{a:"0"});

}
);

app.post("/loginned",function (req,res) {

    var user=req.body.username;
    var pass=req.body.password;
    newacc.findOne({username:user, password:pass},function(err,bb){


                if (!bb) {
                    res.render("login.ejs",{a:"1"});
                   // alert("Invalid username or password");
                }
                else {
                    res.render("loginned.ejs", {name: bb.name});
                }
    })
});

app.post("/register",function(req,res)
    {


        var details={
         name:req.body.name,
          username: req.body.username,
          password: req.body.password,
          email: req.body.email

    };

               newacc.create(details);

        //  var name= req.body.name;
        // var username= req.body.username;
        // var password= req.body.password;
        // var email= req.body.email;





        res.render("register.ejs",{name:details.name});
        /*res.redirect("/register");*/

    }

);
app.listen(3000,function()
{
    console.log("SERVER STARTED");
});
