import express from "express";
//database model
import {UserModel} from "../../database/allModels";
//validation functions
import { validateSignup, validateSignin } from "../../validation/auth";
//passport for authentication and session
import passport from "passport";

const Router = express.Router();

/* 
    ROUTE   /signup
    DESC    sign up with email and password
    METHOD POST
    PARAMS  NONE
    ACCESS  PUBLIC
*/

Router.post("/signup", async(req, res) => {
    try{
        await validateSignup(req.body.credentials);
        //check if user exists
        await UserModel.findEmailAndPhone(req.body.credentials);


        //Create collection and generate auth token
        const token = await UserModel.create(req.body.credentials).then((result) => {
            return result.generateToken();
        });

        //return token if response successful(200)
        return res.status(200).json({token});
    }
    catch(err){
        return res.status(500).json({error : err.message});
    }
});

/* 
    ROUTE   /signin
    DESC    sign in with email and password
    METHOD POST
    PARAMS  NONE
    ACCESS  PUBLIC
*/


Router.post("/signin", async(req, res) => {
    try{
        //validate credentials
        await validateSignin(req.body.credentials);
        //check if user exists and return user
        const user = await UserModel.findByEmailAndPassword(req.body.credentials);


        //Generate auth token with user instance if exists
        const token = await user.generateToken();

        //return token if response successful(200)
        return res.status(200).json({token, status: 'Success'});
    }
    catch(err){
        return res.status(500).json({error : err.message});
    }
});

/* 
    ROUTE   /google
    DESC    sign in with google
    METHOD  GET
    PARAMS  NONE
    ACCESS  PUBLIC
*/

Router.get("/google", passport.authenticate("google"));

/* 
    ROUTE   /google/callback
    DESC    sign in with google callback
    METHOD  GET
    PARAMS  NONE
    ACCESS  PUBLIC
*/

Router.get("/google/callback", passport.authenticate("google", {successRedirect: "/dashboard", failureRedirect: "/"}
    // (res, req) => {
    //     return res.json({
    //         token: req.session.passport.user.token
    //     });
    // }
));

Router.get("/logout", (req,res) => {
    req.logOut((err)=>{
        if(err) return console.log(err);
        res.redirect('/');
    });
});


export default Router;