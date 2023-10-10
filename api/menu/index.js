import express from "express";
import { MenuModel, ImageModel } from "../../database/allModels";
import { validateRestaurantId } from "../../validation/food";

const Router = express.Router();

/*
 Request    GET
 Desc       Get menus by particular restaurant
 Params     _id
 Access     Public
 */

Router.get('/list/:_id', async(req,res)=>{
    try{
        await validateRestaurantId(req.params);
        const {_id} = req.params;
        const menus = await MenuModel.findOne({_id});

        return res.status(200).json({menus})
    }catch(error){
        return res.status(500).json({error: error.message});
    }
});

/*
 Request    GET
 Desc       Get menu image by particular restaurant id
 Params     _id
 Access     Public
 */

 Router.get('/image/:_id', async(req, res) => {
    try{
        await validateRestaurantId(req.params);
        const {_id} = req.params;
        const menus = await ImageModel.findOne(_id);

        return res.status(200).json({menus});
    }catch(error){
        return res.status(500).json({error: error.message});
    }
 })


export default Router;