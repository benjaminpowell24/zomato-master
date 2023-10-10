import express from "express";
import multer from "multer";
import { ImageModel } from "../../database/allModels";
import {fileUpload} from "../../utils/aws/s3";

const Router = express.Router();

//Multer for file upload config
//upload files to server memory and then upload to bucket

const storage = multer.memoryStorage();
const upload = multer({ storage });

/*
 Request    GET
 Desc       Upload image to s3 bucket and save url to db
 Params     NONE
 Access     Public
 */

Router.post("/", upload.single("file"), async (req, res) => {
    try {
        //"file" is the key in request
        const file = req.file;

        const bucketOptions = {
            Bucket: "bucketName",
            Key: file.originalname,
            Body: file.buffer,
            ContentType: file.mimetype,
            ACL: "public-read"
        }
        
        const uploadImage = await fileUpload(bucketOptions);
    }
    catch (err) {
        return res.status(500).json({ error: err.message });
    }
});