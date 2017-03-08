/**
 * Created by AYUSH on 1/11/2017.
 */
NODE_MODULES_CACHE=false;
var express=require("express"),
    app=express(),
    bodyParser=require("body-parser"),
    mongoose = require("mongoose"),
    Schema = mongoose.Schema;
var nodemailer = require('nodemailer');
var sg = require('sendgrid')(process.env.SENDGRID_API_KEY);
//var cred = require('./mail.js');
var cred= process.env.cred;
var x = process.env.x;
// var y = process.env.y;
// var x = require('./mail.js');
// var y = require('./mail.js');


// Bootstrap admin site
// admin.config(app, mongoose, '/admin');

 //mongoose.connect("mongodb://localhost/bb");
//mongoose.connect("mongodb://localhost/book");
 mongoose.connect(x.toString());
// mongoose.connect(y.toString());
//mongoose.connect("mongodb://RADAdesigners:ramavtarbilotia@ds161039.mlab.com:61039/bankebiharifashions");

var bookSchema=new mongoose.Schema({
    category:String,
    items:[{
        name:String,
        id:Number,
        amount:Number,
        price:Number}]
});


var bbSchema=new mongoose.Schema({
    name:String,
    username:String,
    password:String,
    email:String,
    confirmation:String,
    orders:[bookSchema]
});



var newacc =mongoose.model("bbl",bbSchema);
var bookings=mongoose.model("booked",bookSchema);


app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());



app.get("/",function (req,res) {

    res.render("website.ejs");


});

app.post("/loginned/readymade",function(req,res){
    res.status(200).send({success: 'OK'});
    });


app.get("/create",function(req,res) {

    res.render("create.ejs",{b:"2"});
    });

app.get("/login",function(req,res){
res.render("login.ejs",{a:"0"});

}
);



app.post("/loginned",function (req,res) {

    var user=req.body.username;
    var pass=req.body.password;
    newacc.findOne({username:user, password:pass,confirmation:"1"},function(err,bb){


                if (!bb) {
                    res.render("login.ejs",{a:"1"});
                   // alert("Invalid username or password");
                }
                else {
                    res.render("loginned.ejs", {name: bb.name});
                }
    })
});



app.get("/confirmation/username/:un",function(req,res){

    var verify=(req.params.un);
    newacc.findOne({username:(req.params.un)},function(err,bb){
        if(bb) {
           // newacc.findOne({username:(req.params.un)},bb.confirmation="1");
            newacc.update({username:verify},{$set:{confirmation:"1"}},function (err, numUpdated) {
                if (err) {
                    console.log(err);
                } else if (numUpdated) {
                    console.log('Confirmation set to 1');
                } else {
                    console.log('No document found with defined "find" criteria!');
                }
                //Close connection
                           });
            res.render("loginned.ejs", {name: bb.name});
        }

        else{
            res.send("USER NOT REGISTERED");
        }
        //console.log(newacc.confirmation);
    })

});


app.get("/loginned/:type",function (req,res){

    var type = (req.params.type);
    if(type==="bari") {
        type = "2";
    }

   else if(type==="chooni") {
        type = "3";
    }

   else if(type==="readymade") {
        type = "1";
    }

   else if(type==="sarees") {
        type = "4";
    }

   else if(type==="suits") {
        type = "6";
    }

   else if(type==="suitings") {
        type = "5";
    }

    res.render("fashion.ejs", {type: type});

});


app.get("/fashion/:type",function (req,res){

    var type = (req.params.type);
    if(type==="bari") {
        type = "2";
    }

    else if(type==="chooni") {
        type = "3";
    }

    else if(type==="readymade") {
        type = "1";
    }

    else if(type==="sarees") {
        type = "4";
    }

    else if(type==="suits") {
        type = "6";
    }

    else if(type==="suitings") {
        type = "5";
    }

    res.render("fashion.ejs", {type: type});

});


app.post("/register",function(req,res)
    {


        var details={
            name:req.body.name,
            username: req.body.username,
            password: req.body.password,
            email: req.body.email,
            confirmation:"0"
            // orders:["Sarees"]

        };

        newacc.findOne({username:details.username},function(err,bb){

            if(!bb){

                newacc.findOne({email:details.email},function(err,bb){

                    if(!bb) {


                        //document.write('<scr'+'ipt type="text/javascript" src="mail.js" ></scr'+'ipt>');
// create reusable transporter object using the default SMTP transport
                 //        transporter = nodemailer.createTransport('smtps://agbilotia1998%40gmail.com:rajeshgupta@smtp.gmail.com');
                 //            transporter=nodemailer.createTransport(cred.toString());
// setup e-mail data with unicode symbols
//                         var mailOptions = {
//                             from: '"Banke Bihari Fashions <agbilotia1998@gmail.com>', // sender address
//                             to:details.email, // list of receivers
//                             subject: 'Registered ✔', // Subject line
//                             text: 'Registration successful 🐴', // plaintext body
//                             html:"<img src='http://deizi23.com/wp-content/uploads/2015/05/2015-05-21_14-50-28_%D1%87-.png'><br><br>"+
//
//                             '<b> Thanks for registering At Banke Bihari Fashions.... 🐴<br><br></b>' +
//                             'Proceed and shop at the Clothing Store..<br><br>'+
//                             ' So what are you waiting for , <br>' +
//                             'GO AHEAD AND SHOP!!!!!!!!!!!!!!<br><br>'+
//                                "<a href='http://127.0.0.1:5000/confirmation/username/" + details.username + "' target='_blank'> 'Click on the link to activate your account'</a><br>"+
//                             //"<a href='http:///localhost:3000/confirmation/username'> CLICK</a>"+
//
//                             '<br><i>HAPPY SHOPPING<br> <br></i>'+
//                             'FOR FURTHER QUERIES:<br>'+'CONTACT:<br>AYUSH GUPTA'// html body
//                         };

// send mail with defined transport object
//                         transporter.sendMail(mailOptions, function(error, info){
//                             if(error){
//                                 return console.log(error);
//                             }
//                             console.log('Message sent: ' + info.response);
//                             newacc.create(details);
//                             res.render("register.ejs", {name: details.name});
//
//                         });


                        var request = sg.emptyRequest({
                            method: 'POST',
                            path: '/v3/mail/send',
                            body: {
                                personalizations: [
                                    {
                                        to: [
                                            {
                                                email: details.email
                                            }
                                        ],
                                        subject: 'Registered ✔'
                                    }
                                ],
                                from: {
                                    name:'Banke Bihari Fashions',
                                    email: 'Banke Bihari Fashions <iec2016039@iiita.ac.in>'
                                },
                                content: [
                                    {
                                        type: 'text/html',
                                        value: '<html><body>' +
                                            "<img src='http://deizi23.com/wp-content/uploads/2015/05/2015-05-21_14-50-28_%D1%87-.png'><br><br>"+
                                        '<b> Thanks for registering At Banke Bihari Fashions.... <br><br></b>' +
                             'Proceed and shop at the Clothing Store..<br><br>'+
                             ' So what are you waiting for , <br>' +

                                "<a href='https://shrouded-mountain-57581.herokuapp.com/confirmation/username/" + details.username + "' target='_blank'> 'Click on the link to activate your account'</a><br>"+
                             //"<a href='http:///localhost:3000/confirmation/username'> CLICK</a>"+

                             '<br><i>HAPPY SHOPPING<br> <br></i>'+
                            '<b>FOR FURTHER QUERIES:<br></b>'+'Contact:<br>Ayush Gupta(07705894165)'+// html body
                                        '</body></html>'



                                    }
                                    ]
                            }


                            //});
                        });

//With promise
//                         sg.API(request)
//                             .then(response => {
//                             console.log(response.statusCode);
//                         console.log(response.body);
//                         console.log(response.headers);
//                     })
//                     .catch(error => {
//                             //error is an instance of SendGridError
//                             //The full response is attached to error.response
//                             console.log(error.response.statusCode);
//                     });

//With callback
                        sg.API(request, function(error, response) {
                            if (error) {
                                console.log('Error response received');
                            }

                            else {
                                newacc.create(details);
                                res.render("register.ejs", {name: details.name});
                            }
                            console.log(response.statusCode);
                            console.log(response.body);
                            console.log(response.headers);
                        });


                    }
                    else{
                        res.render("create.ejs",{b:"0"});
                    }

            })
            }
            else{
                res.render("create.ejs",{b:"1"});
            }

        });

        //  var name= req.body.name;
        // var username= req.body.username;
        // var password= req.body.password;
        // var email= req.body.email;+
        
        /*res.redirect("/register");*/

    });



app.listen(process.env.PORT || 5000,function()
{
    console.log("SERVER STARTED");
});

// app.set('port', (process.env.PORT || 5000));