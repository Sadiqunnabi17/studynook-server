const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

const initializePassport = () => {
  const { googleAuth } = require("../modules/user/user.service");

  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.NODE_ENV === "production"
          ? "https://studynook-server-yxr0.onrender.com/api/users/auth/google/callback"
          : "http://localhost:5000/api/users/auth/google/callback",
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const user = await googleAuth({
            name: profile.displayName,
            email: profile.emails[0].value,
            image: profile.photos[0].value,
          });
          return done(null, user);
        } catch (err) {
          return done(err, null);
        }
      }
    )
  );

  return passport;
};

module.exports = initializePassport;