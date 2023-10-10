import express from 'express';
import { OrderModel } from '../../database/allModels';
import { validateUserById } from '../../validation/user';
import { validateOrderDetails } from '../../validation/order';
import passport from "passport";

const Router = express.Router();

/*
 Request    POST
 Desc       Create order by user _id
 Params     _id
 Body       Order details object
 Access     Public
 */
Router.post('/create/:_id', async(req, res) => {
    try{
        await validateUserById(req.params);
        await validateOrderDetails(req.body);
        const {_id} = req.params;
        const {order} = req.body;

        const newOrder = await OrderModel.updateOne({user: _id}, {$push: {orderDetails: order}});

        return res.status(200).json({order: newOrder});
    }catch(err){
        return res.status(500).json({error: err.message})
    }
});

/*
 Request    GET
 Desc       Get all orders by user id
 Params     _id
 Access     Public
 */

Router.get('/:_id', passport.authenticate('jwt', { session: false }), async(req, res) => {
    try{
        await validateUserById(req.params);
        const {_id} = req.params;
        const orders = await OrderModel.find({
            user: _id
        });
        if(!orders){
            return res.status(404).json({error: 'No orders found for this user'});
        }
        return res.status(200).json({orders});
    }catch(err){
        return res.status(500).json({error: err.message});
    }
});



 /*
 Request    GET
 Desc       Get orders by status ie. placed, in progress, complete, cancelled 
 Params     status
 Access     Public
 */

 Router.get('/status/:status', async(req, res) => {
    try{
        const {status} = req.params;
        const orders = await OrderModel.find({
            "orderDetails.status" : status
        });
        if(!orders){
            return res.status(404).json({error: `No orders with status ${status}`});
        }
        return res.status(200).json({orders});
    }catch(err){
        return res.status(500).json({error: err.message});
    }
}); 

 /*
 Request    PUT
 Desc       Update order status
 Params     NONE
 Access     Public
 */


//  Router.put('/update/:_id/:status', async(req,res)=>{
//     try{
//         const {_id, status} = req.params;
//         const updateOrder = await OrderModel.updateOne({id: ObjectId(_id)}, {
//             "orderDetails.status": status
//         });
//     }catch(err){
//         return res.status(500).json({error: err.message});
//     }
//  });


 export default Router;