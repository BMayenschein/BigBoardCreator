const passport = require("passport");
const validator = require("validator");
const User = require("../models/User");

exports.getLogin = (req, res) => {
  if (req.user) {
    return res.redirect("/");
  }
  res.render("login", {
    title: "Login",
  });
};

exports.postLogin = async (req, res, next) => {
  const validationErrors = [];
  if (!validator.isEmail(req.body.email))
    validationErrors.push({ msg: "Please enter a valid email address." });
  if (validator.isEmpty(req.body.password))
    validationErrors.push({ msg: "Password cannot be blank." });

  if (validationErrors.length) {
    req.flash("errors", validationErrors);
    return res.redirect("/auth/login");
  }
  req.body.email = validator.normalizeEmail(req.body.email, {
    gmail_remove_dots: false,
  });

  try {
    const user = await new Promise((resolve, reject) => {
      passport.authenticate("local", (err, user, info) => {
        if (err) {
          reject(err);
        }
        if (!user) {
          req.flash("errors", info);
          return res.redirect("/auth/login");
        }
        req.logIn(user, (err) => {
          if (err) {
            reject(err);
          }
          req.flash("success", { msg: "Success! You are logged in." });
          res.redirect(req.session.returnTo || "/");
        });
        resolve(user);
      })(req, res, next);
    });
  } catch (err) {
    return next(err);
  }
};

exports.logout = async (req, res, next) => {
  req.logout(function(err) {
    if (err) {return next(err);}
    req.session = null;
    res.redirect('/');
  });
}
exports.getSignup = (req, res) => {
  if (req.user) {
    return res.redirect("/");
  }
  res.render("signup", {
    title: "Create Account",
  });
};

exports.postSignup = async (req, res, next) => {
  const validationErrors = [];
  if (!validator.isEmail(req.body.email))
    validationErrors.push({ msg: "Please enter a valid email address." });
  if (!validator.isLength(req.body.password, { min: 8 }))
    validationErrors.push({
      msg: "Password must be at least 8 characters long",
    });
  if (req.body.password !== req.body.confirmPassword)
    validationErrors.push({ msg: "Passwords do not match" });
  if (!validator.isAlphanumeric(req.body.userName))
    validationErrors.push({ msg: "Usernames can only contain letters and numbers"})
  if (validationErrors.length) {
    req.flash("errors", validationErrors);
    return res.redirect("/auth/signup");
  }
  req.body.email = validator.normalizeEmail(req.body.email, {
    gmail_remove_dots: false,
  });

  const user = new User({
    userName: req.body.userName,
    email: req.body.email,
    password: req.body.password,
  });

  try {
    const existingUser = await User.findOne({
      $or: [{ email: req.body.email }, { userName: req.body.userName }],
    });
    if (existingUser) {
      req.flash("errors", {
        msg: "Account with that email address or username already exists.",
      });
      return res.redirect("/auth/signup");
    }
    await user.save();
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      res.redirect("/");
    });
  } catch (err) {
    return next(err);
  }
};