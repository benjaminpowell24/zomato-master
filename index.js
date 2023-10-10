//.env variable
require("dotenv").config();

//express server, cors loading resources from other servers, helmet security
import express from "express";
import cors from "cors";
import helmet from "helmet";
import googleConfig from "./config/google.config";
import routeConfig from "./config/route.config";
//use auth api for auth routes
import Auth from "./api/auth";
import Restaurant from "./api/restaurant";
import Food from "./api/food";
import Menu from "./api/menu";
import Order from "./api/order";
import Review from "./api/review";

//AWS yet to be configured. Image API commented out
// import Image from './api/image';

//function to connect to mongodb
import connectionDB from "./database/connection";

import session from "express-session";
import passport from "passport";

//Create express server instance as app
const app = express();
//Only parse json requests
app.use(express.json());
//Only parse url-encoded bodies
app.use(express.urlencoded({ extended: false }));
//Allow access to other server resources or APIs
app.use(cors());
//Extra layer of protection
app.use(helmet());

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
  }));

//Initialize and use session
app.use(passport.initialize());
app.use(passport.session());

//configure passport
googleConfig(passport);
routeConfig(passport);

//Use auth router eg. '/auth/route/' for all authentication routes
app.use('/auth', Auth);
app.use('/restaurant', Restaurant);
app.use('/food', Food);
app.use('/menu', Menu);
app.use('/order', Order);
app.use('/review', Review);
// app.use('/image', Image);


const isLoggedIn = async(req, res, next) => {
    return req.user ? next() : res.status(401).json({error: "Unauthorized"});
}

//Home page get request
app.get("/", (req, res) => res.json({ message: "Home" }))

app.get("/dashboard", isLoggedIn, (req,res) => {
    return res.send(`Hello ${req.user.user.fullname}. Your access token is ${req.session.passport.user.token}`);
});

//Listen to port 4000, connect to mongodb
app.listen(4000, () => connectionDB().then(() => console.log("Server up and running"))
    .catch(() => console.log(`Database connection failed`)));