const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const {User} = require("../models/user");
require("dotenv").config();

passport.use(
    new GoogleStrategy(
        {
            clientID: "1051281936466-v2stemkudlur1206tt4vvbt6qlvu3qlm.apps.googleusercontent.com",
            clientSecret: "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",
            callbackURL: "/auth/google/callback",
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                let users = await User.findOne({ googleId: profile.id });
                console.log("user can login with google",User);
                if (!users) {
                    users = await User.create({
                        name: profile.displayName,
                        email: profile.emails[0].value,
                        googleId: profile.id
                    });
                }
                return done(null, users); 
            } catch (error) {
                return done(error, null);
            }
        }
    )
);

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (error) {
        done(error, null);
    }
});

module.exports = passport;
