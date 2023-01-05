const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const Schema = mongoose.Schema;
//heritage object
const baseOptions = {
  discriminatorKey: "itemtype", // our discriminator key, could be anything
  collection: "items", // the name of our collection
};

const UserSchema = new Schema(
  {
    username: {
      type: String,
    },
    // firstName: {
    //   type: String,
    //   required: [true, "firstName is required"],
    //   minlength: [3, "firstName must be at least 3 characters"],
    // },
    // lastName: {
    //   type: String,
    //   required: [true, "lastName is required"],
    //   minlength: [3, "lastName must be at least 3 characters"],
    // },
    email: {
      type: String,
    },
    password: {
      type: String,
    },

    picture: {
      type: String,
      default:
        "https://firebasestorage.googleapis.com/v0/b/smart-closer.appspot.com/o/1618998894766-avatarCloser.jpg?alt=media",
    },
    cloudinary_id: {
      type: String,
    },
    phone: {
      type: String,
    },
    role: {
      type: String,
    },

    resetPasswordLink: {
      data: String,
      default: "",
    },

    followers: [],
    following: [],

    // category: [
    //   {
    //     type: Schema.ObjectId,
    //     ref: "Category",
    //   },
    // ],
    // isLoggedIn: {
    //   type: Boolean,
    //   default: false,
    //   //required: true
    // },
  },
  { timestamps: true }
);

//creating the virtual field for confirm password
UserSchema.virtual("confirm")
  .get(() => this.confirm)
  .set((value) => (this.confirm = value));

//before saving the user to the db, we will hash their password using bcrypt
UserSchema.pre("save", function (next) {
  bcrypt
    .hash(this.password, 10)
    .then((hash) => {
      this.password = hash;
      next();
    })
    .catch((err) => {
      console.log("hashing failed tho! now what! 20 minute rule?", err);
      next();
    });
});

UserSchema.methods.generateAuthToken = function (id, role) {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

module.exports = mongoose.model("User", UserSchema);
