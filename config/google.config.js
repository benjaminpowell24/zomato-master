//import googleOAuth instance
import googleOAuth from "passport-google-oidc";
import { UserModel } from "../database/allModels";

const GoogleStrategy = googleOAuth;

export default (passport) => {
    passport.use(
        new GoogleStrategy({
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: "http://localhost:4000/auth/google/callback",
            scope: ['email', 'profile']
        }, async function verify(issuer, profile, done) {
            const getUser = {
                _id: profile.id,
                fullname: profile.displayName,
                email: profile.emails[0].value
                // profilePhoto: profile.photos[0].value
            };
            try{
                const user = await UserModel.findOne({email: `${getUser.email}`});
                if(user){
                    const token = await user.generateToken();
        
                    return done(null, {user, token});
                }
                else{
                    user = await UserModel.create({email: `${getUser.email}`, fullname: `${getUser.fullname}`});
        
                    const token = await user.generateToken();
        
                    return done(null, {user, token});
                }
            }catch(err){
                return done(err);
            }

        }
        )
    );
    //Serialize user to session for persistent session management to work
    passport.serializeUser((user, done) => done(null, user));
    //deserialize user when subsequent requests are made
    passport.deserializeUser((user, done) => done(null, user));
}

