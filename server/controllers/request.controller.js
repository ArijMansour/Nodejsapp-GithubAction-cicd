const jwt = require("jsonwebtoken");
const Pharmacy = require("../models/pharmacy.model");
const Request = require("../models/request.model");

/***************PHARMACY REQUEST APPROVE BY ADMIN**************** */

exports.approveRequestController = (req, res) => {
  const { token, state, password, confirm, role } = req.body;

  if (token) {
    if (state === true) {
      //Generate  passowrd :

      jwt.verify(token, process.env.JWT_ACCOUNT_ACTIVATION, (err, decoded) => {
        if (err) {
          console.log("Activation error");
          return res.status(401).json({
            errors: "Expired link. Signup again",
          });
        } else {
          const {
            _id,
            username,
            // pharmacyAddress,
            phone,
            email,
            password,
            confirm,
            role,
          } = jwt.decode(token);

          //already exist user by this request :
          Pharmacy.findOne({ id: _id, email: email }).then((userExist) => {
            console.log(userExist);
            if (userExist) {
              return res.json({
                message: "request was already confirmed ",
                exist: true,
              });
            } else {
              console.log(username);
              const user = new Pharmacy({
                username,
                // pharmacyAddress,
                email,
                password,
                confirm,
                phone,
                role,
              });

              const confirmedRequest = {
                state: true,
                name: "Confirmed",
              };
              Request.findOneAndUpdate(
                { userEmail: user.email },
                confirmedRequest,
                {
                  new: true,
                }
              )
                .then((res) => console.log(res))
                .catch((err) => console.log("err" + err));

              user.save((err, user) => {
                if (err) {
                  return res.status(401).json({
                    errors: err,
                  });
                } else {
                  return res.json({
                    success: true,
                    message: user,
                    message: "Pharmacy Request  success",
                  });
                }
              });
            }
          });
        }
      });
    } else if (state === false) {
      return res.json({
        message: "Your Request was declined by our ADMIN we are too sorry",
      });
    }
  } else {
    return res.json({
      message: "error happening please try again",
    });
  }
};

module.exports.getAllRequestController = (request, response) => {
  Request.find({})
    .then((Requests) =>
      response.json({
        allData: Requests,
        totalPages: Requests.length,
      })
    )
    .catch((err) => response.json(err));
};

module.exports.getRequestController = (request, res) => {
  Request.findOne({ _id: request.params.id })
    .then((Request) => {
      return res.status(200).json(Request);
    })
    .catch((error) => {
      return res.status(400).json({ status: 400, message: error.message });
    });
};

// module.exports.updateRequestController = (request, response) => {
//   const requestUpdated = req.body;
//   try {
//       const { id } = req.params;

//       CommentCourse.updateOne({ _id: mongoose.Types.ObjectId(req.params.id)} , { Body: commentUpdated.Body }, function(
//       err,
//       result
//     ) {
//       if (err) {
//         res.send(err);
//       } else {
//           res.status(201).json( result);
//       }
//     });

//   } catch (error) {
//     return res.status(400).json({ status: 400, message: error.message });
//   }
// },

exports.deleteRequestController = (req, res) => {
  try {
    const { id } = req.params;
    Request.findOneAndDelete({ _id: id }, function (err) {
      if (err) console.log(err);
      return res
        .status(205)
        .json({ status: 205, message: "Successful deletion" });
    });
  } catch (error) {
    return res.status(400).json({ status: 400, message: error.message });
  }
};
