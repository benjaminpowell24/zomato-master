import express from 'express';
import { UserModel } from '../../database/allModels';
import { validateUserById, validateUserData } from '../../validation/user';
const Router = express.Router();

/*
 Request    GET
 Desc       Get user by user _id
 Params     _id
 Access     Public
 */

Router.get('/:_id', async (req, res) => {
    try {
        await validateUserById(req.params);
        const { _id } = req.params;
        const user = await UserModel.findOne({ id: _id });

        return res.status(200).json({ user: user });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
});

/*
 Request    Put   
 Desc       update user by user _id
 Params     _id
 Body       user data
 Access     Public
 */

Router.put('/update/:_id', async (req, res) => {
    try {
        await validateUserById(req.params);
        await validateUserData(req.body);
        const { _id } = req.params;
        const { userData } = req.body;
        const updateUser = await UserModel.updateOne({ id: _id }, { $set: userData });

        return res.status(200).json({ user: updateUser });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
})


export default Router;