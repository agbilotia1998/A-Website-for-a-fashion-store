/**
 * Created by AYUSH on 1/11/2017.
 */
NODE_MODULES_CACHE=false;
var express=require("express"),
    admin=require("node-django-admin"),
    app=express(),
    path = require('path'),
    bodyParser=require("body-parser"),
    mongoose = require("mongoose"),
    Schema = mongoose.Schema,
    nodemailer = require('nodemailer'),
    sg = require('sendgrid')(process.env.SENDGRID_API_KEY),
    passport=require("passport"),
    LocalStrategy=require("passport-local"),
    passportLocalMongoose=require("passport-local-mongoose");
    cookieParser=require("cookie-parser");
    // ejsLint=require('./path/to/index.js');
    // User=require("./models/user");
var x = process.env.x;
mongoose.Promise = global.Promise;

 //mongoose.connect("mongodb://localhost/bb");
//mongoose.connect("mongodb://localhost/book");
 mongoose.connect(x.toString());

var bookSchema=new mongoose.Schema({
    category:String,
    name:String,
    price:Number,
    amount:Number,
    source:String

});

var bbSchema=new mongoose.Schema({
    name:String,
    username:String,
    password:String,
    email:String,
    confirmation:String,
    orders:[String],
    total:0
});


var newacc =mongoose.model("bbl",bbSchema);
var bookings=mongoose.model("book",bookSchema);


app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(require("express-session")({
    secret:"Fashion is Us",
    resave:false,
    saveUninitialized:false
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
// app.use(express.static(path.join(__dirname, 'public')));
// passport.use(new LocalStrategy(User.authenticate()));
//  passport.serializeUser(User.serialiseUser());
//  passport.deserializeUser(User.deserialiseUser());



app.get("/",function (req,res) {

    res.render("website.ejs");


});

function isLoggedIn(req,res,next) {
    console.log(req.isAuthenticated());
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("login.ejs");
}

// app.post("/loginned/readymade",function(req,res){
//     res.status(200).send({success: 'OK'});
//     });


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
                    req.session.username=user;
                    res.render("loginned.ejs", {name: bb.name,username:bb.username});
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
            res.redirect("/login");
        }

        else{
            res.send("USER NOT REGISTERED");
        }
        //console.log(newacc.confirmation);
    })

});


app.get("/loginned/:un/myorders",function(req,res){
    var un=(req.params.un);
    //console.log(un);
    newacc.findOne({username:un},function(err,bb){
        if(req.session.username===un) {
            res.render("myorders.ejs", {info: bb});
        }

        else{
            res.redirect("/login");
        }
        //console.log(bb.orders);
    });
});

app.get("/loginned/:un/myaccount",function(req,res){
    var un=(req.params.un);
    //console.log(un);
    newacc.findOne({username:un},function(err,bb){
        if(req.session.username===un) {
            res.render("myaccount.ejs", {info: bb});
        }

        else res.redirect("/login");
        //console.log(bb.orders);
    });
});

app.get("/loginned/:un/:type",function (req,res){

    var type = (req.params.type);
    var un=(req.params.un);
    //console.log(un);

    if(type==="bari") {
        bookings.find({category:type},function(err,bb){
            if(req.session.username===un) {
                res.render("fashion.ejs", {datas: bb, type: type, un: un});
            }
            else{
                res.redirect("/login");
            }
        });
        type = "2";
    }
    else if(type==="chooni") {
        bookings.find({category:type},function(err,bb){
            if(req.session.username===un) {
                res.render("fashion.ejs", {datas: bb, type: type, un: un});
            }
            else{
                res.redirect("/login");
            }
        });
        type = "3";
    }
    else if(type==="readymade") {
        bookings.find({category:type},function(err,bb){
            if(req.session.username===un) {
                res.render("fashion.ejs", {datas: bb, type: type, un: un});
            }
            else{
                res.redirect("/login");
            }
        });
        type = "1";
    }
    else if(type==="sarees") {
        bookings.find({category:type},function(err,bb){
            if(req.session.username===un) {
                res.render("fashion.ejs", {datas: bb, type: type, un: un});
            }

            else{
                res.redirect("/login");
            }

            //console.log(datas.price);
        });
        type = "4";
    }
    else if(type==="suits") {
        bookings.find({category:type},function(err,bb){
            if(req.session.username===un) {
                res.render("fashion.ejs", {datas: bb, type: type, un: un});
            }
            else{
                res.redirect("/login");
            }
        });
        type = "6";
    }
    else if(type==="suitings") {
        bookings.find({category: type}, function (err, bb) {
            if(req.session.username===un) {
                res.render("fashion.ejs", {datas: bb, type: type, un: un});
            }
            else{
                res.redirect("/login");
            }
        });
        type = "5";
    }
    else if(type==="gallery"){
            bookings.find({category:type},function(err,bb){
                res.render("fashion.ejs",{datas: bb,type:type,un:un});
            });
    }});


app.get("/fashion/:type",function (req,res){

    var type = (req.params.type);
    var datas=[];

    if(type==="bari") {
        bookings.find({category:type},function(err,bb){
            res.render("fashion.ejs",{datas:bb,type:type,un:false});
        });
        type = "2";
    }
    else if(type==="chooni") {
        bookings.find({category:type},function(err,bb){
            res.render("fashion.ejs",{datas: bb,type:type,un:false});
        });
        type = "3";
    }
    else if(type==="readymade") {
        bookings.find({category:type},function(err,bb){
            res.render("fashion.ejs",{datas: bb,type:type,un:false});

        });
        type = "1";
    }
    else if(type==="sarees") {
        bookings.find({category:type},function(err,bb){
            res.render("fashion.ejs",{datas: bb,type:type,un:false});
             //console.log(bb[0].id);
        });
        type = "4";
    }
    else if(type==="suits") {
        bookings.find({category:type},function(err,bb){
            res.render("fashion.ejs",{datas:bb,type:type,un:false});
        });
        type = "6";
    }
    else if(type==="suitings") {
        bookings.find({category:type},function(err,bb){
            res.render("fashion.ejs",{datas: bb,type:type,un:false});
        });
        type = "5";
    }
    else if(type==="gallery"){
        bookings.find({category:type},function(err,bb){
            res.render("fashion.ejs",{datas:bb,type:type,un:false});
            //console.log(type);
    });
        }
});

app.post("/loginned/:un/book/:id",function(req,res) {
    var id = req.params.id;
    var un = req.params.un;
    //var orders = [];
    //console.log(un);
    bookings.findOne({_id: id}, function (err, book) {
        var amount = (book.amount) - 1;
        newacc.findOne({username: un}, function (err, bb) {
            //bb.orders.push(book.name);
            var name=book.name;
            var total=(bb.total)+(book.price);
            //console.log(bb.total);
             newacc.update({username: un}, {$push: {orders:name},$set: {total: total}}, function (err, updated) {
                 if (err)
                     console.log(err);

             });
        });
        bookings.update({_id: id}, {$set: {amount: amount}}, function (err, updated) {
            if (err)
                console.log(err);
            else {
                res.json({success: "Updated Successfully", status: 200});
            }
        });

    });
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

                                "<a href='https://bankebiharifashions.herokuapp.com/confirmation/username/" + details.username + "' target='_blank'> 'Click on the link to activate your account'</a><br>"+
                             //"<a href='http:///localhost:3000/confirmation/username/" + > CLICK</a>"+

                             '<br><i>HAPPY SHOPPING<br> <br></i>'+
                            '<b>FOR FURTHER QUERIES:<br></b>'+'Contact:<br>Ayush Gupta(07705894165)'+// html body
                                        '</body></html>'
                                    }
                                    ]
                            }
                        });

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

    });

//admin.config(app, mongoose, '/admin');
//
app.get("/logout",function (req,res) {
   req.logout();
   req.session.username=false;
   res.redirect("/");
});

app.get("/admin",function (req,res) {
  res.render("admin.ejs");
});

app.post("/admin",function (req,res) {
   var adminname=req.body.username;
   var adminpass=req.body.password;
   if(adminname==process.env.adminusername)
   {
       if(adminpass==process.env.adminpassword)
       {
           req.session.username=adminname;
           res.render("add.ejs",{un:adminname});
       }

       else{
           res.redirect("/admin");
       }

   }

   else{
       res.redirect("/admin");
   }
});

app.get("/admin/:un/:add",function(req,res){
     var addTo=req.params.add;
     var un =req.params.un;
    // console.log(addTo);
    if(un===req.session.username) {
        res.render("addform.ejs", {addTo: addTo,un:un});
    }

    else{
        res.redirect("/admin");
    }

});

app.post("/admin/:add",function(req,res){
    var addTo=(req.params.add);
        //console.log(addTo);
    var ADD = {
         category:addTo,
         name:req.body.name,
         price:req.body.price,
         amount:req.body.amount,
         source:req.body.source
};
    bookings.findOne({category:addTo},function (err,bb) {
        //bb.items.push(ADD);
        bookings.create(ADD);
        res.send("Added Succesfully");
        //console.log(bb.items);
    });
    //res.render("addform.ejs");

});

app.get("/admin/logout",function(req,res){
   req.session.username=false;
    res.redirect("/admin");
});
//



app.listen(process.env.PORT || 5000,function()
{
    console.log("SERVER STARTED");
});

// app.set('port', (process.env.PORT || 5000));