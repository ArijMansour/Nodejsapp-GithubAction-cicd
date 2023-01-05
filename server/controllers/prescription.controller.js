const Prescription = require("../models/prescription.model");
const cloudinary = require("../utils/cloudinary");
const fs = require("fs");
exports.addPrescriptionController = async (req, res, next) => {
  let urls = [];

  const { description, dosage, state, pharmacy } = req.body;
  const startOfDay = Date.now();
  const userid = req.user._id;

  console.log(userid);
  const arr = [];
  Prescription.find({ patient: userid }).then((err, data) => {
    console.log(data);
  });

  const count = await Prescription.count({
    userid,
    limitUpload: { $gte: 3 },
  });
  // alternative: const count = await posts.count({userId, _id: {$gte: startofDayConvertedToMongoId});

  const uploader = async (path) =>
    await cloudinary.uploads(path, "prescription");

  const files = req.files;

  //current user
  const userCurrent = req.user._id;
  for (const file of files) {
    const { path } = file;
    const newPath = await uploader(path);
    urls.push(newPath);
    fs.unlinkSync(path);
  }

  let multiple_resources = urls;
  let x = null;
  if (description === "undefined") {
    x = "NO NOTE";
  } else {
    x = description;
  }

  const pres = await new Prescription({
    description: x,
    multiple_resources,
    patient: userCurrent,
    dosage: dosage,
    state: "PENDING",
    pharmacy: pharmacy,
  });

  pres
    .save()
    .then((result) => {
      return res.json({
        success: true,
        message: "Successfully added!",
        result: {
          _id: result._id,
          description: result.description,

          multiple_resources: result.multiple_resources,
          dosage: dosage,
          state: state,
          patient: userCurrent,
        },
      });
    })
    .catch((err) => {
      return res.json({
        success: false,
        message: "Upload Prescription failed" + err,
      });
    });

  // console.log(err);
};

exports.myPrescriptionController = async (req, res, next) => {
  const id = req.user._id;
  Prescription.find({ patient: id }).exec((err, cat) => {
    if (err || !cat) {
      return res.status(400).json({
        error: "Prescription not found",
      });
    }

    return res.json(cat);
  });
};

exports.getAllPrescriptionsController = async (req, res) => {
  const id = req.user._id;

  return res.json(
    await Prescription.find({ pharmacy: id })
      .populate("patient")
      .sort({ createdAt: -1 })
      .exec()
  );
};

exports.updatePrescriptionController = async (req, res) => {
  Prescription.findByIdAndUpdate(req.params.id, req.body, function (err, data) {
    if (err) return res.json({ success: false, errors: err });
    else
      return res.json({
        success: true,
        message: "Prescription updated",
        data: req.body,
      });
  });
};

exports.removePrescriptionController = async (req, res) => {
  Prescription.deleteOne({ _id: req.params.id })
    .then((res) =>
      res.json({
        success: true,
        message: deleted,
      })
    )
    .catch((err) => res.json({ success: false, errors: err }));
};
