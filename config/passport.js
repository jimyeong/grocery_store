const KakaoStrategy = require("passport-kakao").Strategy;
require("dotenv").config();


module.exports = function (passport) {

    let localhostURI = "/oauth/callback";
    let callbackURL = process.env.NODE_ENV !== "production" ? localhostURI : process.env.callbackURL;

    passport.use(new KakaoStrategy({
            clientID: process.env.clientID,
            clientSecret: "",
            callbackURL: localhostURI
        },
        (accessToken, refreshToken, profile, done) => {
            done(null, profile);
        }
    ))
    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function (id, done) {
        User.findById(id, function (err, user) {
            done(err, user);
        });
    });

}