import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

//Create User schema and specify data types. 'Timestamp:true' logs timestamp
const UserSchema = new mongoose.Schema({
    fullname: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String },
    address: [{ details: { type: String }, for: { type: String } }],
    contact: { type: Number }
}, {
    timestamps: true
});

//Static method to check if user email or contact exists before creating user
UserSchema.statics.findEmailAndPhone = async ({ email, contact }) => {
    const isUserByEmail = await UserModel.findOne({ email });
    const isUserByPhone = await UserModel.findOne({ contact });

    if (isUserByEmail || isUserByPhone) {
        throw new Error(`User with email or phone number already exists`)
    }
    return false;
}

//Static method to check if user email exists and if password the password matches the hash
UserSchema.statics.findByEmailAndPassword = async ({ email, password }) => {
    //Get user by email if exists
    const user = await UserModel.findOne({ email });

    if (!user) throw new Error(`User does not exist`);

    //compare passwords
    const doesPasswordMatch = await bcrypt.compare(password, user.password);

    if (!doesPasswordMatch) {
        throw new Error(`Invalid Password`)
    }
    return user;
}

//Method to generate token from user _id instance
UserSchema.methods.generateToken = function () {
    return jwt.sign({ user: this._id.toString() }, "ZomatoApp");
}

//Salting and hashing
UserSchema.pre("save", function (next) {
    const user = this;
    if (!user.isModified) return next();
    if(user.password){
        bcrypt.genSalt(8, (error, salt) => {
            if (error) return next(error);
    
            bcrypt.hash(user.password, salt, (error, hash) => {
                if (error) return next(error);
                user.password = hash;
                return next();
            })
        });
    }else{
        return next();
    }

});

//Export user schema as model
export const UserModel = mongoose.model("Users", UserSchema);