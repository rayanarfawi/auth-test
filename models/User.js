const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const validator = require("validator");
const jwt = require("jsonwebtoken");
let userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true
    },
    email: {
      type: String,
      require: true,
      unique: true,
      lowercase: true,
      validate: value => {
        if (!validator.isEmail(value)) throw new Error("Invalid Email Address");
      }
    },
    password: {
      type: String,
      require: true,
      minLength: 8,
      validate: [
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
        "Minimum eight characters, at least one letter and one number"
      ]
    }
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

//! Hash the password before save
userSchema.pre("save", async function(next) {
  if (this.isModified("password"))
    this.password = await bcrypt.hash(this.password, 8);

  next();
});

userSchema.methods.generateAuthToken = function() {
  return jwt.sign({ _id: this._id }, process.env.JWT_KEY);
};

userSchema.statics.findByCredentials = async (email, password) => {
  // Search for a user by email and password.
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error({ error: "Invalid login credentials" });
  }
  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch) {
    throw new Error({ error: "Invalid login credentials" });
  }
  return user;
};

const User = mongoose.model("User", userSchema);
module.exports = User;
