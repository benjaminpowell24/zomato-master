import express from "express";
import { FoodModel } from "../../database/allModels";
import { validateRestaurantId, validateCategory } from "../../validation/food";

const Router = express.Router();

/*
 Request    GET
 Desc       Get all foods by particular restaurant
 Params     _id
 Access     Public
 */


Router.get('/:_id', async (req, res) => {
    try {
        await validateRestaurantId(req.params);
        const { _id } = req.params;

        const foods = await FoodModel.find({
            restaurant: _id
        });

        return res.status(200).json({ foods });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

/*
 Request    GET
 Desc       Get all foods by category
 Params     _id
 Access     Public
 */

Router.get('/r/:category', async (req, res) => {
    try {
        await validateCategory(req.params);
        const { category } = req.params;

        const foods = await FoodModel.find({
            categories: { $regex: category, $options: "i" }
        });

        return res.status(200).json({ foods });

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});


export default Router;