/***********************Modules************************** */

const Admins = require("../models/admin.model");
const User = require("../models/user.model");
const ROLES = require("../config/roles.config");
const Cloudinary = require("../utils/cloudinary");
const bcrypt = require("bcrypt");
const cloud = require("cloudinary");
const shipperModel = require("../models/shipper.model");
/***********************UPDATE PICTURE************************** */

exports.updateProfilePictureController = async (req, res) => {
  try {
    let user = User.findById(req.params.id);
    if (user.cloudinary_id) {
      await Cloudinary.uploader.destroy(user.cloudinary_id);
    } else {
      const result = await cloud.uploader.upload(req.file.path);
      const data = {
        picture: result.secure_url || user.picture,
        cloudinary_id: result.public_id || user.cloudinary_id,
      };

      user = await User.findByIdAndUpdate(req.params.id, data, { new: true });
      return res.json(user);
    }
  } catch (err) {
    console.log(err);
  }
};

/***********************UPDATE USER PROFILE************************** */

exports.addAdminController = function (req, res) {
  var Admin = new Admins({
    email: req.body.email,
    phone: req.body.phone,
    username: req.body.username,
    password: req.body.password,
    role: req.body.role,
  });

  Admin.save(function (err, Admin) {
    if (err) {
      res.send({ State: "Not Ok", msg: "err" + err });
    } else {
      res.send({ State: "Okay", msg: "added" + Admin });
    }
  });
};

/***********************UPDATE Patient PROFILE************************** */

exports.updateProfilePatientController = (req, res) => {
  let updateProfilePatient = {
    username: req.body.username,
    firstName: req.body.firstName,
    lastName: req.body.firstName,

    email: req.body.email,
    address: req.body.address,
    gender: req.body.gender,
  };

  User.findOneAndUpdate({ _id: req.params.id }, updateProfilePatient, {}).then(
    (oldResult) => {
      User.findOne({ _id: req.params.id })
        .then((result) => {
          console.log("this is a result" + result);
          return res.json({
            success: true,
            msg: "Successfully updated !",
            result: {
              _id: result._id,
              username: result.username,
              firstName: result.firstName,
              lastName: result.firstName,
              email: result.email,
              address: result.address,
              gender: result.gender,
            },
          });
        })
        .catch((err) => {
          console.log("error update profile =" + err);
          res.status(500).json({
            success: false,
            msg: `Something went wrong. ${err}`,
          });
        });
    }
  );
};

/***********************UPDATE ADMIN PROFILE************************** */

exports.updateProfileAdminController = (req, res) => {
  let updatedProfile = {
    username: req.body.username,
    phone: req.body.phone,
    email: req.body.email,
    picture: req.body.picture,
  };
  console.log(updatedProfile);

  User.findOneAndUpdate({ _id: req.params.id }, updatedProfile, {}).then(
    (oldResult) => {
      console.log("true");
      User.findOne({ _id: req.params.id })
        .then((result) => {
          console.log("this is result " + result);
          res.json({
            success: true,
            msg: `Successfully updated!`,
            result: {
              _id: result._id,
              username: result.username,
              email: result.email,
              phone: req.body.phone,
              role: result.role,
              picture: result.picture,
            },
          });
        })

        .catch((err) => {
          console.log("false1");
          res
            .status(500)
            .json({ success: false, msg: `Something went wrong. ${err}` });
          return;
        });
    }
  );
};

/***********************UPDATE PHARMACY PROFILE************************** */

exports.updateProfilePharmacyController = (req, res) => {
  let updateProfilePharmacy = {
    username: req.body.username,
    phone: req.body.phone,
    email: req.body.email,
    picture: req.body.picture,
    pharmacyAddress: req.body.pharmacyAddress,
    city: req.body.city,
    codePostal: req.body.codePostal,
  };
  console.log(updateProfilePharmacy.city);

  User.findOneAndUpdate({ _id: req.params.id }, updateProfilePharmacy, {
    upsert: true,
  }).then((oldResult) => {
    User.findOne({ _id: req.params.id })
      .then((result) => {
        console.log("this is a result" + result);

        return res.json({
          success: true,
          msg: "Successfully updated !",
          result: {
            _id: result._id,
            username: result.username,
            email: result.email,
            phone: result.phone,
            role: result.role,
            picture: result.picture,
            pharmacyAddress: result.pharmacyAddress,
            city: result.city,
            codePostal: result.codePostal,
          },
        });
      })
      .catch((err) => {
        console.log("error update profile =" + err);
        res.status(500).json({
          success: false,
          msg: `Something went wrong. ${err}`,
        });
      });
  });
};

/***********************CHANGE PASSWORD************************** */
exports.changePasswordController = (req, res) => {
  const password = req.body.password;
  const newPassword = req.body.newPassword;
  const idUser = req.body.idUser;
  // const hash = crypto.createHmac("sha1", salt).update(password).digest("hex");
  User.findOne({ _id: idUser })
    .then((result) => {
      bcrypt.compare(password, result.password, (err, isMatch) => {
        if (err) throw err;
        if (isMatch) {
          //Update password for user with new password
          bcrypt.genSalt(10, (err, salt) =>
            bcrypt.hash(newPassword, salt, (err, hash) => {
              if (err) throw err;

              console.log("exist password");
              User.updateOne({ _id: idUser }, { password: hash })
                .then((result) => {
                  console.log("worked !!!");
                  return res.json({
                    success: true,
                    message: `Password Successfully Changed! you can login with your new password`,
                  });
                })
                .catch((err) => {
                  return res.json({
                    success: false,
                    message: `Something went wrong. ${err}`,
                  });
                });
            })
          );
        } else {
          console.log("mouch mawjoud");
          return res.json({
            success: false,
            message: `Incorrect Password ! try again :(`,
          });
          //return res.json({ msg: "there is an error !!!" });
        }
      });
    })
    .catch((err) => {
      console.log(err);
      return res.json({ message: "user not found", success: false });
    });

  //return res.status(200).json(hash);
};

// REDIRECTION TO BOARD BASED ON ROLE :
exports.patientBoardController = (req, res) => {
  res.send("patient board");
};
exports.adminBoardController = (req, res) => {
  res.send("admin board");
};
exports.pharmacyBoardController = (req, res) => {
  res.send("pharmacy board");
};

//CRUD methods

/********GET ALL PATIENTS******************* */

exports.getAllPatients = async (req, res) => {
  const users = await User.find({ role: ROLES.PATIENT }).exec();

  return res.send({ patients: users });
};

exports.getDataController = async (req, res) => {
  try {
    const pageNumber = parseInt(req.query.pageNumber) || 0;
    const limit = parseInt(req.query.limit) || 12;
    const result = {};
    const totalUsers = await User.countDocuments().exec();
    let startIndex = pageNumber * limit;
    const endIndex = (pageNumber + 1) * limit;
    result.totalUsers = totalUsers;
    if (startIndex > 0) {
      result.previous = {
        pageNumber: pageNumber - 1,
        limit: limit,
      };
    }
    if (endIndex < (await User.countDocuments().exec())) {
      result.next = {
        pageNumber: pageNumber + 1,
        limit: limit,
      };
    }
    result.data = await User.find()
      .sort("-_id")
      .skip(startIndex)
      .limit(limit)
      .exec();
    result.rowsPerPage = limit;
    return res.json({ msg: "Users Fetched successfully", data: result });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Sorry, something went wrong" });
  }
};

exports.getAllUsers = async (req, res) => {
  const users = await User.find({}).exec();

  return res.send({ users: users });
};

exports.getAllPharmacies = async (req, res) => {
  const pharmacies = [];
  const address = req.user.address;

  const users = await User.find({
    role: ROLES.PHARMACY,
  }).exec();

  for (var data of users) {
    console.log(data.pharmacyAddress);
  }

  return res.send({ pharmacies: users });
};

exports.getUserByIdController = (req, res) => {
  const userId = req.params.id;
  User.findById(userId).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "User not found",
      });
    }
    user.password = undefined;

    res.json(user);
  });
};

exports.getUserByEmail = (request, response) => {
  User.findOne({ email: request.params.email })
    .then((user) => response.json(user))
    .catch((err) => response.json(err));
};

exports.getUserProfile = (req, res) => {
  User.findOne({ _id: req.user._id })
    .then((user) => {
      console.log(user);

      if (user) {
        console.log(user.username);
        return res.json({
          _id: user._id,
          username: user.username,
          email: user.email,
          phone: user.phone,
        });
      } else {
        return res.status(404);
        throw new Error("User not found");
      }
    })
    .catch((err) => response.json(err));
};

exports.updateUser = (request, response) => {
  User.findOneAndUpdate({ _id: request.params.id }, request.body, {
    new: true,
  })
    .then((updatedUser) => response.json(updatedUser))
    .catch((err) => response.json(err));
};

exports.deleteUser = (request, response) => {
  User.deleteOne({ _id: request.params.id })
    .then((res) => response.json(res))
    .catch((err) => response.json(err));
};

//SEARCH USER:
exports.searchUserController = async (req, res) => {
  const keyword = req.query.search
    ? {
        $or: [
          { username: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};

  console.log(req.user);
  const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });

  res.send(users);
};

// Follow a User
// changed
exports.followUser = async (req, res) => {
  const id = req.params.id;
  const { _id } = req.body;
  console.log(id, _id);
  if (_id == id) {
    res.status(403).json("Action Forbidden");
  } else {
    try {
      const followUser = await User.findById(id);
      const followingUser = await User.findById(_id);

      if (!followUser.followers.includes(_id)) {
        console.log("foooo", followingUser);
        await followUser.updateOne({ $push: { followers: _id } });
        await followingUser.updateOne({ $push: { following: id } });
        res.status(200).json("User followed!");
      } else {
        res.status(403).json("you are already following this id");
      }
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  }
};

// Unfollow a User
// changed
exports.unfollowUser = async (req, res) => {
  const id = req.params.id;
  const { _id } = req.body;

  if (_id === id) {
    res.status(403).json("Action Forbidden");
  } else {
    try {
      const unFollowUser = await UserModel.findById(id);
      const unFollowingUser = await UserModel.findById(_id);

      if (unFollowUser.followers.includes(_id)) {
        await unFollowUser.updateOne({ $pull: { followers: _id } });
        await unFollowingUser.updateOne({ $pull: { following: id } });
        res.status(200).json("Unfollowed Successfully!");
      } else {
        res.status(403).json("You are not following this User");
      }
    } catch (error) {
      res.status(500).json(error);
    }
  }
};

exports.getUser = async (req, res) => {
  const id = req.params.id;

  try {
    const user = await User.findById(id);
    if (user) {
      const { password, ...otherDetails } = user._doc;

      res.status(200).json(otherDetails);
    } else {
      res.status(404).json("No such User");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

// MANAGE SHIPPER :
exports.createShipperController = function (req, res) {
  var Shipper = new shipperModel({
    email: req.body.email,
    phone: req.body.phone,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    password: "shipper",
    confirmPassword: "shipper",
    role: ROLES.SHIPPER,
    city: req.body.city,
  });

  shipperModel.findOne({ phone: req.body.phone }).then((result) => {
    if (result) {
      return res
        .status(403)
        .json({ message: "Shipper already joined", exist: true });
    } else {
      Shipper.save(function (err, s) {
        if (err) {
          return res.json({ error: err, exist: false, error: true });
        } else {
          return res.json({
            message: "Shipper created",
            data: s,
            exist: false,
            error: false,
          });
        }
      });
    }
  });
};

exports.getShippers = async (req, res) => {
  return res.json(await shipperModel.find({}).exec());
};

exports.deleteShipper = async (req, res) => {
  await shipperModel
    .deleteOne({ _id: req.params.id })
    .then((res) =>
      res.json({
        success: true,
        message: "shipper deleted",
      })
    )
    .catch((err) => res.json({ success: false, errors: err }));
};

exports.getShipper = async (req, res) => {
  const id = req.params.id;

  try {
    const user = await shipperModel.findById(id);
    if (user) {
      // const { password, ...otherDetails } = user._doc;

      res.status(200).json(user);
    } else {
      res.status(404).json("No such Shipper");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.updateShipper = (req, res) => {
  shipperModel.findByIdAndUpdate(req.params.id, req.body, function (err, data) {
    if (err) return res.json({ success: false, errors: err });
    else
      return res.json({
        success: true,
        message: "Shipper updated",
        data: req.body,
      });
  });
};
