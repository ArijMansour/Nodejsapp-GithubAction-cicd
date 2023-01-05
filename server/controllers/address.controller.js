const address = require("../models/address.model");
const UserAddress = require("../models/address.model");
const Pharmacy= require('../models/pharmacy.model');
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
exports.addAddress = (req, res) => {
  //return res.status(200).json({body: req.body})
  const { address } = req.body;
  if (address) {
    if (address._id) {
      UserAddress.findOneAndUpdate(
        { user: req.user._id, "address._id": address._id },
        {
          $set: {
            "address.$": address,
          },
        }
      ).exec((error, address) => {
        if (error) return res.status(400).json({ error });
        if (address) {
          res.status(201).json({ address });
        }
      });
    } else {
      UserAddress.findOneAndUpdate(
        { user: req.user._id },
        {
          $push: {
            address: address,
          },
        },
        { new: true, upsert: true }
      ).exec((error, address) => {
        if (error) return res.status(400).json({ error });
        if (address) {
          res.status(201).json({ address });
        }
      });
    }
  } else {
    res.status(400).json({ error: "Params address required" });
  }
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
exports.getAddress = (req, res) => {
  UserAddress.findOne({ user: req.user._id }).exec((error, userAddress) => {
    if (error) return res.status(400).json({ error });
    if (userAddress) {
      return res.status(200).json({ userAddress });
    }
  });
};
exports.getAllAddress = (req, res) => {


  UserAddress.find({}).populate('user').exec((error, userAddress) => {
    if (error) return res.status(400).json({ error });
    if (userAddress) {
      console.log(userAddress)


      return res.status(200).json({ data:userAddress });
    }
  });
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
exports.updateAddress = async (req, res) => {
  console.log("hhhhhhhhhhhhhhhh", req.params.id);

  try {
    const { city, state, country, zip } = req.body;

    const adrId = address._id;
    const idAdr = req.params.id;
    const adr = await address.findOne({ adrId: idAdr });

    const data = JSON.parse(JSON.stringify(adr.address[0]));
    console.log("xxxx", data._id);

    data.city = req.body.city || data.city;
    data.zip = req.body.zip || data.zip;
    data.country = req.body.country || data.country;
    data.state = req.body.state || data.state;

    UserAddress.findOneAndUpdate(
      { user: req.user._id, "address._id": data._id },
      {
        $set: {
          "address.$": data,
        },
      },
      function (err, data) {
        if (err) return res.json({ success: false, errors: err });
        else
          return res.json({
            success: true,
            message: "address updated",
            data: data,
          });
      }
    ).clone();
  } catch (e) {
    console.log(e);
    return;
  }
};

// TypeError: adr.save is not a function &nbsp; &nbsp;at exports.updateAddress (D:\Pharmacy-delievery-app\Pharmacy-delievery-app\server\controllers\address.controller.js:65:32)<br> &nbsp; &nbsp;at Layer.handle [as handle_request] (D:\Pharmacy-delievery-app\Pharmacy-delievery-app\node_modules\express\lib\router\layer.js:95:5)<br> &nbsp; &nbsp;at next (D:\Pharmacy-delievery-app\Pharmacy-delievery-app\node_modules\express\lib\router\route.js:144:13)<br> &nbsp; &nbsp;at D:\Pharmacy-delievery-app\Pharmacy-delievery-app\server\middlewares\authJwt.js:27:5<br> &nbsp; &nbsp;at processTicksAndRejections (internal/process/task_queues.js:95:5)</pre>

/////////////////////////////\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
