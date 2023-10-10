import AWS from "aws-sdk";

//AWS S3 bucket configuration


const s3Bucket = AWS.S3({
    //enter keys stored in env variables
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
    region: "region-string"
});

//Promise function to handle file upload when resolved or rejected
export const fileUpload = (options) => {
    return new Promise((resolve, reject) =>
        s3Bucket.upload(options, (error, data) => {
            if (error) return reject(error);
            return resolve(data);
        })
    );
}