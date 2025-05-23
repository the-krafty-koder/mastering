import LocalStrategy from "passport-local";
import bcrypt from "bcrypt";

const initialize = (passport, getUserByEmail, getUserById) => {
  const authenticateUser = async (email, password, done) => {
    const user = getUserByEmail(email);
    if (user === null)
      return done(null, false, { message: "No user with that email" });
    try {
      if (await bcrypt.compare(password, user.password)) {
        return done(null, user);
      } else {
        return done(null, false, { message: "Password incorrect" });
      }
    } catch (err) {
      return done(err);
    }
  };

  passport.use(new LocalStrategy({ usernameField: "email" }, authenticateUser));
  // Store user's ID in session
  passport.serializeUser((user, done) => done(null, user.id));

  // Retrieve full user object from ID
  passport.deserializeUser((id, done) => {
    const user = getUserByEmail(id); // <-- This needs to get by ID, not email
    if (user == null) {
      return done(new Error("User not found"));
    }
    done(null, user);
  });
};

export default initialize;
