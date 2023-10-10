import express from 'express';
import { ReviewModel } from '../../database/allModels';
import { validateReviewData } from '../../validation/review';

const Router = express.Router();

/*
 Request    POST
 Desc       Create review
 Params     NONE
 Body       Review object
 Access     Public
 */

Router.post('/create', async(req,res)=> {
    try{
        await validateReviewData(req.body);
        const {review} = req.body;
        await ReviewModel.create(review);

        return res.status(200).json({review: 'created new review successfully'});
    }catch(err){
        return res.status(500).json({error: err.message});
    }
});

/*
 Request    PUT
 Desc       update/edit review
 Params     _id
 Body       reviewData
 Access     Public
 */

Router.put('/update/:_id', async(req,res)=>{
    try{
        const {_id} = req.params;
        const {reviewData} = req.body;
        const updateReview = await ReviewModel.updateOne({id: _id}, {$set: reviewData});

        return res.status(200).json({review: updateReview});
    }catch(err){
        return res.status(500).json({error: err.message})
    }
})

/*
 Request    DELETE
 Desc       Delete review
 Params     _id
 Access     Public
 */

 Router.delete('/delete/:_id', async(req,res)=>{
    try{
       const {_id} = req.params;
       await ReviewModel.deleteOne({id : _id});
       
       return res.status(200).json({review: 'deleted review successfully'});
    }catch(err){
        return res.status(500).json({error: err.message});
    }
 });

 export default Router;