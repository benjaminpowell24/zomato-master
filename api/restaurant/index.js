import express from "express";
import { RestaurantModel } from "../../database/allModels";
import { validateRestaurantCity, validateSearchString } from "../../validation/restaurant";
import { validateRestaurantId } from "../../validation/food";

const Router = express.Router();
/*
 Request    GET
 Desc       Get all restaurants in city
 Params     NONE
 Access     Public
 */

Router.get("/", async (req, res) => {
    try {
        await validateRestaurantCity(req.query);
        const { city } = req.query;
        const restaurants = await RestaurantModel.find({ city });
        return res.status(200).json({ restaurants });
    } catch (err) {
        return res.status(500).json({ error: err.message })
    }
});

/*
 Request    GET
 Desc       Get restaurant details by id
 Params     NONE
 Access     Public
 */

Router.get("/:_id", async (req, res) => {
    try {
        await validateRestaurantId(req.params);
        const { _id } = req.params;
        const restaurant = await RestaurantModel.findOne(_id);

        if (!restaurant) {
            return res.status(404).json({ error: "restaurant not found" });
        }

        return res.status(200).json({ restaurant });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
});

/*
 Request    GET
 Desc       Get restaurant details by search
 Params     NONE
 Body       searchString
 Access     Public
 */

Router.get('/search', async (req, res) => {
    try {
        await validateSearchString(req.body);
        const { searchString } = req.body;

        const restaurants = await RestaurantModel.find({
            name: { $regex: searchString, $options: "i" }
        });

        return res.status(200).json({ restaurants });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

export default Router;