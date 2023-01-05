const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const _ = require("lodash");
const crypto = require("crypto");
const User = require("../models/user.model");
const Patient = require("../models/patient.model");

const ROLES = require("../config/roles.config");

const Request = require("../models/request.model");

let smtpTransport = require("../config/mail.config");

const { validationResult } = require("express-validator");

const { twilioNum, smsKey, client } = require("../config/twilio.config");
const shipperModel = require("../models/shipper.model");

/******************Sign Up For Pharmacy (it's gonna approved by the ADMIN**************** */
exports.registerController = (req, res) => {
  const { username, phone, password, confirm, email } = req.body;

  const role = ROLES.PHARMACY;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const firstError = errors.array().map((error) => error.msg)[0];
    return res.status(422).json({
      errors: firstError,
    });
  } else {
    Request.findOne({ userEmail: email }).then((request) => {
      if (request !== null) {
        if (request.state == false)
          return res.json({
            exist: true,
            message: "Your request already  sent wait for us please",
          });
      }
    });

    User.findOne({
      email,
    }).exec((err, user) => {
      if (user) {
        return res
          .status(400)
          .json({ success: false, errors: "Email is taken" });
      } else {
        const token = jwt.sign(
          {
            username,
            // pharmacyAddress,
            phone,
            password,
            confirm,
            email,
            role,
          },
          process.env.JWT_ACCOUNT_ACTIVATION,
          {
            expiresIn: "24h",
          }
        );

        const emailData = {
          from: process.env.ADMIN_EMAIL,
          to: email,
          subject: "Account activation link",
          html: `
        <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
        <html xmlns="http://www.w3.org/1999/xhtml">
          <head>
          <title>Internal_email-29</title>
          <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <style type="text/css">
            * {
            -ms-text-size-adjust:100%;
            -webkit-text-size-adjust:none;
            -webkit-text-resize:100%;
            text-resize:100%;
            }
            a{
            outline:none;
            color:#40aceb;
            text-decoration:underline;
            }
            a:hover{text-decoration:none !important;}
            .nav a:hover{text-decoration:underline !important;}
            .title a:hover{text-decoration:underline !important;}
            .title-2 a:hover{text-decoration:underline !important;}
            .btn:hover{opacity:0.8;}
            .btn a:hover{text-decoration:none !important;}
            .btn{
            -webkit-transition:all 0.3s ease;
            -moz-transition:all 0.3s ease;
            -ms-transition:all 0.3s ease;
            transition:all 0.3s ease;
            }
            table td {border-collapse: collapse !important;}
            .ExternalClass, .ExternalClass a, .ExternalClass span, .ExternalClass b, .ExternalClass br, .ExternalClass p, .ExternalClass div{line-height:inherit;}
            @media only screen and (max-width:500px) {
            table[class="flexible"]{width:100% !important;}
            table[class="center"]{
              float:none !important;
              margin:0 auto !important;
            }
            *[class="hide"]{
              display:none !important;
              width:0 !important;
              height:0 !important;
              padding:0 !important;
              font-size:0 !important;
              line-height:0 !important;
            }
            td[class="img-flex"] img{
              width:100% !important;
              height:auto !important;
            }
            td[class="aligncenter"]{text-align:center !important;}
            th[class="flex"]{
              display:block !important;
              width:100% !important;
            }
            td[class="wrapper"]{padding:0 !important;}
            td[class="holder"]{padding:30px 15px 20px !important;}
            td[class="nav"]{
              padding:20px 0 0 !important;
              text-align:center !important;
            }
            td[class="h-auto"]{height:auto !important;}
            td[class="description"]{padding:30px 20px !important;}
            td[class="i-120"] img{
              width:120px !important;
              height:auto !important;
            }
            td[class="footer"]{padding:5px 20px 20px !important;}
            td[class="footer"] td[class="aligncenter"]{
              line-height:25px !important;
              padding:20px 0 0 !important;
            }
            tr[class="table-holder"]{
              display:table !important;
              width:100% !important;
            }
            th[class="thead"]{display:table-header-group !important; width:100% !important;}
            th[class="tfoot"]{display:table-footer-group !important; width:100% !important;}
            }
          </style>
          </head>
          <body style="margin:0; padding:0;" bgcolor="#eaeced">
          <table style="min-width:320px;" width="100%" cellspacing="0" cellpadding="0" bgcolor="#eaeced">
            <!-- fix for gmail -->
            <tr>
            <td class="hide">
              <table width="600" cellpadding="0" cellspacing="0" style="width:600px !important;">
              <tr>
                <td style="min-width:600px; font-size:0; line-height:0;">&nbsp;</td>
              </tr>
              </table>
            </td>
            </tr>
            <tr>
            <td class="wrapper" style="padding:0 10px;">
              <!-- module 1 -->
              <table data-module="module-1" data-thumb="thumbnails/01.png" width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td data-bgcolor="bg-module" bgcolor="#eaeced">
                <table class="flexible" width="600" align="center" style="margin:0 auto;" cellpadding="0" cellspacing="0">
                  <tr>
                  <td style="padding:29px 0 30px;">
                    
                  </td>
                  </tr>
                </table>
                </td>
              </tr>
              </table>
              <!-- module 2 -->
              <table data-module="module-2" data-thumb="thumbnails/02.png" width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td data-bgcolor="bg-module" bgcolor="#eaeced">
                <table class="flexible" width="600" align="center" style="margin:0 auto;" cellpadding="0" cellspacing="0">
                
                  <tr>
                  <td data-bgcolor="bg-block" class="holder" style="padding:58px 60px 52px;" bgcolor="#f9f9f9">
                    <table width="100%" cellpadding="0" cellspacing="0">
                    <tr>
                      <td data-color="title" data-size="size title" data-min="25" data-max="45" data-link-color="link title color" data-link-style="text-decoration:none; color:#292c34;" class="title" align="center" style="font:35px/38px Arial, Helvetica, sans-serif; color:#292c34; padding:0 0 24px;">
                      Activate Account
                      </td>
                    </tr>
                    <tr>
                      <td data-color="text" data-size="size text" data-min="10" data-max="26" data-link-color="link text color" data-link-style="font-weight:bold; text-decoration:underline; color:#40aceb;" align="center" style="font:bold 16px/25px Arial, Helvetica, sans-serif; color:#888; padding:0 0 23px;">
                      Please use the following link to Activate your account.
                      This email may containe sensetive information
        
                      </td>
                    </tr>
                    <tr>
                      <td style="padding:0 0 20px;">
                      <table width="134" align="center" style="margin:0 auto;" cellpadding="0" cellspacing="0">
                        <tr>
                        <td data-bgcolor="bg-button" data-size="size button" data-min="10" data-max="16" class="btn" align="center" style="font:12px/14px Arial, Helvetica, sans-serif; color:#f8f9fb; text-transform:uppercase; mso-padding-alt:12px 10px 10px; border-radius:2px;" bgcolor="#57ba60">
                          <a target="_blank" style="text-decoration:none; color:#ffffff; display:block; padding:12px 10px 10px;" href="${process.env.CLIENT_URL}/activate/${token}">Activate Account</a>
                        </td>
                        </tr>
                      </table>
                      </td>
                    </tr>
                    </table>
                  </td>
                  </tr>
                  <tr><td height="28"></td></tr>
                </table>
                </td>
              </tr>
              </table>
              
            </td>
            </tr>
            <!-- fix for gmail -->
            <tr>
            <td style="line-height:0;"><div style="display:none; white-space:nowrap; font:15px/1px courier;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</div></td>
            </tr>
          </table>
          </body>
        </html>
           
          `,
        };

        smtpTransport.sendMail(emailData, function (err) {
          if (!err) {
            return res.json({
              success: true,
              message: `We've sent a link to your email address`,
            });
          } else {
            return res.json({
              success: false,
              message: err,
            });
          }
        });
      }
    });
  }
};

exports.registerPatientController = (req, res) => {
  const { username, firstName, lastName, phone, email, password, confirm } =
    req.body;

  const role = ROLES.PATIENT;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const firstError = errors.array().map((error) => error.msg)[0];
    return res.status(422).json({
      errors: firstError,
    });
  } else {
    User.findOne({
      email,
    }).exec((err, user) => {
      if (user) {
        return res
          .status(400)
          .json({ success: false, errors: "Email is taken" });
      } else {
        const token = jwt.sign(
          {
            username,
            firstName,
            lastName,
            phone,
            email,
            password,
            confirm,

            role,
          },
          process.env.JWT_ACCOUNT_ACTIVATION,
          {
            expiresIn: "7d",
          }
        );

        const emailData = {
          from: process.env.ADMIN_EMAIL,
          to: email,
          subject: "Account activation link",
          html: `
        <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
        <html xmlns="http://www.w3.org/1999/xhtml">
          <head>
          <title>Internal_email-29</title>
          <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <style type="text/css">
            * {
            -ms-text-size-adjust:100%;
            -webkit-text-size-adjust:none;
            -webkit-text-resize:100%;
            text-resize:100%;
            }
            a{
            outline:none;
            color:#40aceb;
            text-decoration:underline;
            }
            a:hover{text-decoration:none !important;}
            .nav a:hover{text-decoration:underline !important;}
            .title a:hover{text-decoration:underline !important;}
            .title-2 a:hover{text-decoration:underline !important;}
            .btn:hover{opacity:0.8;}
            .btn a:hover{text-decoration:none !important;}
            .btn{
            -webkit-transition:all 0.3s ease;
            -moz-transition:all 0.3s ease;
            -ms-transition:all 0.3s ease;
            transition:all 0.3s ease;
            }
            table td {border-collapse: collapse !important;}
            .ExternalClass, .ExternalClass a, .ExternalClass span, .ExternalClass b, .ExternalClass br, .ExternalClass p, .ExternalClass div{line-height:inherit;}
            @media only screen and (max-width:500px) {
            table[class="flexible"]{width:100% !important;}
            table[class="center"]{
              float:none !important;
              margin:0 auto !important;
            }
            *[class="hide"]{
              display:none !important;
              width:0 !important;
              height:0 !important;
              padding:0 !important;
              font-size:0 !important;
              line-height:0 !important;
            }
            td[class="img-flex"] img{
              width:100% !important;
              height:auto !important;
            }
            td[class="aligncenter"]{text-align:center !important;}
            th[class="flex"]{
              display:block !important;
              width:100% !important;
            }
            td[class="wrapper"]{padding:0 !important;}
            td[class="holder"]{padding:30px 15px 20px !important;}
            td[class="nav"]{
              padding:20px 0 0 !important;
              text-align:center !important;
            }
            td[class="h-auto"]{height:auto !important;}
            td[class="description"]{padding:30px 20px !important;}
            td[class="i-120"] img{
              width:120px !important;
              height:auto !important;
            }
            td[class="footer"]{padding:5px 20px 20px !important;}
            td[class="footer"] td[class="aligncenter"]{
              line-height:25px !important;
              padding:20px 0 0 !important;
            }
            tr[class="table-holder"]{
              display:table !important;
              width:100% !important;
            }
            th[class="thead"]{display:table-header-group !important; width:100% !important;}
            th[class="tfoot"]{display:table-footer-group !important; width:100% !important;}
            }
          </style>
          </head>
          <body style="margin:0; padding:0;" bgcolor="#eaeced">
          <table style="min-width:320px;" width="100%" cellspacing="0" cellpadding="0" bgcolor="#eaeced">
            <!-- fix for gmail -->
            <tr>
            <td class="hide">
              <table width="600" cellpadding="0" cellspacing="0" style="width:600px !important;">
              <tr>
                <td style="min-width:600px; font-size:0; line-height:0;">&nbsp;</td>
              </tr>
              </table>
            </td>
            </tr>
            <tr>
            <td class="wrapper" style="padding:0 10px;">
              <!-- module 1 -->
              <table data-module="module-1" data-thumb="thumbnails/01.png" width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td data-bgcolor="bg-module" bgcolor="#eaeced">
                <table class="flexible" width="600" align="center" style="margin:0 auto;" cellpadding="0" cellspacing="0">
                  <tr>
                  <td style="padding:29px 0 30px;">
                    
                  </td>
                  </tr>
                </table>
                </td>
              </tr>
              </table>
              <!-- module 2 -->
              <table data-module="module-2" data-thumb="thumbnails/02.png" width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td data-bgcolor="bg-module" bgcolor="#eaeced">
                <table class="flexible" width="600" align="center" style="margin:0 auto;" cellpadding="0" cellspacing="0">
                
                  <tr>
                  <td data-bgcolor="bg-block" class="holder" style="padding:58px 60px 52px;" bgcolor="#f9f9f9">
                    <table width="100%" cellpadding="0" cellspacing="0">
                    <tr>
                      <td data-color="title" data-size="size title" data-min="25" data-max="45" data-link-color="link title color" data-link-style="text-decoration:none; color:#292c34;" class="title" align="center" style="font:35px/38px Arial, Helvetica, sans-serif; color:#292c34; padding:0 0 24px;">
                      Activate Account
                      </td>
                    </tr>
                    <tr>
                      <td data-color="text" data-size="size text" data-min="10" data-max="26" data-link-color="link text color" data-link-style="font-weight:bold; text-decoration:underline; color:#40aceb;" align="center" style="font:bold 16px/25px Arial, Helvetica, sans-serif; color:#888; padding:0 0 23px;">
                      Please use the following link to Activate your account.
                      This email may containe sensetive information
        
                      </td>
                    </tr>
                    <tr>
                      <td style="padding:0 0 20px;">
                      <table width="134" align="center" style="margin:0 auto;" cellpadding="0" cellspacing="0">
                        <tr>
                        <td data-bgcolor="bg-button" data-size="size button" data-min="10" data-max="16" class="btn" align="center" style="font:12px/14px Arial, Helvetica, sans-serif; color:#f8f9fb; text-transform:uppercase; mso-padding-alt:12px 10px 10px; border-radius:2px;" bgcolor="#57ba60">
                          <a target="_blank" style="text-decoration:none; color:#ffffff; display:block; padding:12px 10px 10px;" href="${process.env.CLIENT_URL}/activate/${token}">Activate Account</a>
                        </td>
                        </tr>
                      </table>
                      </td>
                    </tr>
                    </table>
                  </td>
                  </tr>
                  <tr><td height="28"></td></tr>
                </table>
                </td>
              </tr>
              </table>
              
            </td>
            </tr>
            <!-- fix for gmail -->
            <tr>
            <td style="line-height:0;"><div style="display:none; white-space:nowrap; font:15px/1px courier;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</div></td>
            </tr>
          </table>
          </body>
        </html>
           
          `,
        };

        smtpTransport.sendMail(emailData, function (err) {
          if (!err) {
            return res.json({
              success: true,
              message: `We've sent a link to your email address`,
            });
          } else {
            return res.json({
              success: false,
              message: err,
            });
          }
        });
      }
    });
  }
};

/**************************************SEND OTP For Patient************************************************ */
exports.sendOTPController = (req, res) => {
  const phone = req.body.phone;
  const otp = Math.floor(100000 + Math.random() * 900000);

  const ttl = 2 * 60 * 1000; //time to live
  const expires = Date.now() + ttl;
  const data = `${phone}.${otp}.${expires}`;
  const hash = crypto.createHmac("sha256", smsKey).update(data).digest("hex");
  const fullHash = `${hash}.${expires}`;

  // client.message
  //   .create({
  //     body: `Your One Time Login Password For CFM is ${otp}`,
  //     from: twilioNum,
  //     to: phone,
  //   })
  //   .then((message) => console.log(message))
  //   .catch((err) => console.error(err));

  // res.status(200).send({ phone, hash: fullHash, otp });  // this bypass otp via api only for development instead hitting twilio api all the time
  res.status(200).send({ phone, hash: fullHash, otp }); // Use this way in Production
};

/**************************************VERIFY OTP For Patient************************************************ */

exports.verifyOTPController = (req, res, next) => {
  const phone = req.body.phone;
  const hash = req.body.hash;

  const otp = req.body.otp;

  let [hashValue, expires] = hash.split(".");

  let now = Date.now();
  if (now > parseInt(expires)) {
    return res
      .status(504)
      .json({ message: "Otp code expires(Timeout) please try again." });
  }
  const data = `${phone}.${otp}.${expires}`;
  const newCalculatedHash = crypto
    .createHmac("sha256", smsKey)
    .update(data)
    .digest("hex");

  if (newCalculatedHash === hashValue) {
    const user = new Patient({
      phone: phone,
      role: ROLES.PATIENT,
    });
    user.save((err, result) => {
      if (err) {
        return res.status(400).json({
          error: "Error resetting user password" + err,
        });
      }
      return res
        .status(200)
        .json({ message: "Correct OTP, Your account created successfully" });
    });
  } else {
    return res
      .status(400)
      .send({ verification: false, message: "Incorrect OTP" });
  }
};

//Activate account email pharmacy
exports.activationController = (req, res) => {
  const { token } = req.body;

  if (token) {
    jwt.verify(token, process.env.JWT_ACCOUNT_ACTIVATION, (err, decoded) => {
      if (err) {
        console.log("Activation error");

        return res.json({
          success: false,
          errors: "Expired link. Signup again",
        });
      } else {
        const {
          username,
          // pharmacyAddress,
          phone,
          email,
          password,
          confirm,
          role,
        } = jwt.decode(token);

        console.log(email);
        const user = new User({
          username,
          // pharmacyAddress,
          phone,
          email,
          password,
          confirm,
          role: ROLES.PHARMACY,
        });

        //send request (PENDING);

        const request = new Request({
          name: "PENDING",
          state: false,
          userEmail: user.email,
        });
        // const emailRequest = request.userEmail;
        // Request.findOne({ emailRequest }).exec((err,data) => {

        //   if (data ||!err) {
        //     return res.json({success:false,errors:"your request already exist"});
        //   }})

        request.save((err, request) => {
          if (err) {
            console.log("Save error");
            return res.status(401).json({
              errors: err,
            });
          } else {
            const token = jwt.sign(
              {
                username,
                email,
                // pharmacyAddress,
                phone,
                password,
                confirm,
                role,
              },
              process.env.JWT_ACCOUNT_ACTIVATION,
              {
                expiresIn: "24h",
              }
            );

            //request state
            state = request.state;

            console.log("FROM EMAIL ====>", email);
            console.log("TO EMAIL ====>", process.env.ADMIN_EMAIL);

            const emailData = {
              from: email,
              to: process.env.ADMIN_EMAIL, //send to admin
              subject: "new Pharmacy request",
              html: `
        <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
        <html xmlns="http://www.w3.org/1999/xhtml">
          <head>
          <title>Internal_email-29</title>
          <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <style type="text/css">
            * {
            -ms-text-size-adjust:100%;
            -webkit-text-size-adjust:none;
            -webkit-text-resize:100%;
            text-resize:100%;
            }
            a{
            outline:none;
            color:#40aceb;
            text-decoration:underline;
            }
            a:hover{text-decoration:none !important;}
            .nav a:hover{text-decoration:underline !important;}
            .title a:hover{text-decoration:underline !important;}
            .title-2 a:hover{text-decoration:underline !important;}
            .btn:hover{opacity:0.8;}
            .btn a:hover{text-decoration:none !important;}
            .btn{
            -webkit-transition:all 0.3s ease;
            -moz-transition:all 0.3s ease;
            -ms-transition:all 0.3s ease;
            transition:all 0.3s ease;
            }
            table td {border-collapse: collapse !important;}
            .ExternalClass, .ExternalClass a, .ExternalClass span, .ExternalClass b, .ExternalClass br, .ExternalClass p, .ExternalClass div{line-height:inherit;}
            @media only screen and (max-width:500px) {
            table[class="flexible"]{width:100% !important;}
            table[class="center"]{
              float:none !important;
              margin:0 auto !important;
            }
            *[class="hide"]{
              display:none !important;
              width:0 !important;
              height:0 !important;
              padding:0 !important;
              font-size:0 !important;
              line-height:0 !important;
            }
            td[class="img-flex"] img{
              width:100% !important;
              height:auto !important;
            }
            td[class="aligncenter"]{text-align:center !important;}
            th[class="flex"]{
              display:block !important;
              width:100% !important;
            }
            td[class="wrapper"]{padding:0 !important;}
            td[class="holder"]{padding:30px 15px 20px !important;}
            td[class="nav"]{
              padding:20px 0 0 !important;
              text-align:center !important;
            }
            td[class="h-auto"]{height:auto !important;}
            td[class="description"]{padding:30px 20px !important;}
            td[class="i-120"] img{
              width:120px !important;
              height:auto !important;
            }
            td[class="footer"]{padding:5px 20px 20px !important;}
            td[class="footer"] td[class="aligncenter"]{
              line-height:25px !important;
              padding:20px 0 0 !important;
            }
            tr[class="table-holder"]{
              display:table !important;
              width:100% !important;
            }
            th[class="thead"]{display:table-header-group !important; width:100% !important;}
            th[class="tfoot"]{display:table-footer-group !important; width:100% !important;}
            }
          </style>
          </head>
          <body style="margin:0; padding:0;" bgcolor="#eaeced">
          <table style="min-width:320px;" width="100%" cellspacing="0" cellpadding="0" bgcolor="#eaeced">
            <!-- fix for gmail -->
            <tr>
            <td class="hide">
              <table width="600" cellpadding="0" cellspacing="0" style="width:600px !important;">
              <tr>
                <td style="min-width:600px; font-size:0; line-height:0;">&nbsp;</td>
              </tr>
              </table>
            </td>
            </tr>
            <tr>
            <td class="wrapper" style="padding:0 10px;">
              <!-- module 1 -->
              <table data-module="module-1" data-thumb="thumbnails/01.png" width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td data-bgcolor="bg-module" bgcolor="#eaeced">
                <table class="flexible" width="600" align="center" style="margin:0 auto;" cellpadding="0" cellspacing="0">
                  <tr>
                  <td style="padding:29px 0 30px;">
                    
                  </td>
                  </tr>
                </table>
                </td>
              </tr>
              </table>
              <!-- module 2 -->
              <table data-module="module-2" data-thumb="thumbnails/02.png" width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td data-bgcolor="bg-module" bgcolor="#eaeced">
                <table class="flexible" width="600" align="center" style="margin:0 auto;" cellpadding="0" cellspacing="0">
              
                  <tr>
                  <td data-bgcolor="bg-block" class="holder" style="padding:58px 60px 52px;" bgcolor="#f9f9f9">
                    <table width="100%" cellpadding="0" cellspacing="0">
                    <tr>
                      <td data-color="title" data-size="size title" data-min="25" data-max="45" data-link-color="link title color" data-link-style="text-decoration:none; color:#292c34;" class="title" align="center" style="font:35px/38px Arial, Helvetica, sans-serif; color:#292c34; padding:0 0 24px;">
                      Pharmacy Register Request 
                      </td>
                    </tr>
                    <tr>
                      <td data-color="text" data-size="size text" data-min="10" data-max="26" data-link-color="link text color" data-link-style="font-weight:bold; text-decoration:underline; color:#40aceb;" align="center" style="font:bold 16px/25px Arial, Helvetica, sans-serif; color:#888; padding:0 0 23px;">
                      Click the button to continue...
        
                      </td>
                    </tr>
                    <tr>
                      <td style="padding:0 0 20px;">
                      <table width="134" align="center" style="margin:0 auto;" cellpadding="0" cellspacing="0">
                        <tr>
                        <td data-bgcolor="bg-button" data-size="size button" data-min="10" data-max="16" class="btn" align="center" style="font:12px/14px Arial, Helvetica, sans-serif; color:#f8f9fb; text-transform:uppercase; mso-padding-alt:12px 10px 10px; border-radius:2px;" bgcolor="#57ba60">
                          <a target="_blank" style="text-decoration:none; color:#ffffff; display:block; padding:12px 10px 10px;" href="${process.env.CLIENT_URL}/pharmacy/approveRequest/${token}/${state}">Analyse Request</a>
                        </td>
                        </tr>
                      </table>
                      </td>
                    </tr>
                    </table>
                  </td>
                  </tr>
                  <tr><td height="28"></td></tr>
                </table>
                </td>
              </tr>
              </table>
              
            </td>
            </tr>
            <!-- fix for gmail -->
            <tr>
            <td style="line-height:0;"><div style="display:none; white-space:nowrap; font:15px/1px courier;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</div></td>
            </tr>
          </table>
          </body>
        </html>
                `,
            };

            smtpTransport.sendMail(emailData, function (err) {
              if (!err) {
                return res.json({
                  message: `Your request sent successfully wait for use to analyze it `,
                });
              } else {
                return res.json({
                  message: err,
                });
              }
            });
          }
        });
      }
    });
  }
};

exports.activationPatientController = (req, res) => {
  const { token } = req.body;

  const { email } = jwt.decode(token);

  if (token) {
    jwt.verify(token, process.env.JWT_ACCOUNT_ACTIVATION, (err, decoded) => {
      if (err) {
        console.log("Activation error");

        return res.json({
          success: false,
          errors: "Expired link. Signup again",
        });
      } else {
        User.findOne({
          email,
        }).exec((err, user) => {
          if (user) {
            return res
              .status(400)
              .json({ success: false, exist: "your account already exists" });
          } else {
            const {
              username,
              firstName,
              lastName,
              phone,
              email,
              password,
              confirm,
              address,
              role,
            } = jwt.decode(token);

            console.log(email);

            const user = new Patient({
              username,
              firstName,
              lastName,
              phone,
              email,
              password,
              confirm,
              address,

              role: ROLES.PATIENT,
            });

            console.log(user);
            user.save((err, request) => {
              if (err) {
                console.log("Save error");
                return res.status(401).json({
                  errors: err,
                });
              } else {
                return res
                  .status(200)
                  .json({ message: " Your account created successfully" });
              }
            });
          }
        });
      }
    });
  }
};
/******************Sign In For Pharmacy after request's approved**************** */
/******************Sign In For Pharmacy after request's approved**************** */
exports.signinController = async (req, res, next) => {
  let { email, password } = req.body;

  let payload = {};
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const firstError = errors.array().map((error) => error.msg)[0];
    return res.status(422).json({
      errors: firstError,
    });
  } else {
    User.findOne({ email }).exec((err, user) => {
      if (!user || err) {
        return res.status(400).json({ errors: "user not found" });
      }
      //Check passwowrd

      bcrypt.compare(password, user.password).then((isMatch) => {
        console.log();
        console.log(user.password);
        if (isMatch) {
          if (user.role === "ADMIN") {
            console.log("I am admin");
            const { id, email, role, password, username, phone, picture } =
              user;
            payload = { id, email, role, password, username, phone, picture };
          } else if (user.role === "PATIENT") {
            const {
              id,
              email,
              role,
              username,
              firstName,
              lastName,
              phone,
              picture,
              followers,
              address,
            } = user;
            payload = {
              id,
              email,
              role,

              username,
              firstName,
              lastName,
              phone,
              username,
              picture,
              followers,
              address,
              // isLoggedIn,
            };
          } else {
            const {
              id,
              email,
              role,
              username,
              pharmacyAddress,
              phone,
              picture,
              followers,
            } = user;
            payload = {
              id,
              email,
              role,
              username,
              pharmacyAddress,
              phone,
              picture,
              followers,
              // isLoggedIn,
            };
          }
          // generate a token and send to client

          // user.isLoggedIn = true;
          //console.log(`before ${user.isLoggedIn}`);

          const token = user.generateAuthToken(user._id, user.role);

          console.log("hiiii", payload._id);

          //Set cookie
          res.cookie("userToken", token);

          //  user = user.save();

          //    console.log(`after ${user.isLoggedIn}`);

          return res.status(200).json({
            success: true,
            user: payload,
            token: token,
          });
        } else {
          return res.status(400).json({ errors: "Password invalid try again" });
        }
      });
    });
  }
};

exports.signinShipperController = async (req, res, next) => {
  let { phone } = req.body;

  let payload = {};
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const firstError = errors.array().map((error) => error.msg)[0];
    return res.status(422).json({
      errors: firstError,
    });
  } else {
    console.log(req.body.phone);
    shipperModel.findOne({ phone }).exec((err, user) => {
      if (!user || err) {
        return res.status(400).json({ errors: "user not found" });
      }

      const { id, firstName, lastName, role, city, phone } = user;
      payload = {
        id,
        firstName,
        lastName,
        role,
        city,
        phone,
        // isLoggedIn,
      };

      // enerate a token and send to client

      // user.isLoggedIn = true;
      //console.log(`before ${user.isLoggedIn}`);

      const token = user.generateAuthToken(user._id, user.role);

      console.log("hiiii", token);

      

      //Set cookie
      res.cookie("userToken", token);

      //  user = user.save();

      //    console.log(`after ${user.isLoggedIn}`);

      return res.status(200).json({
        success: true,
        user: payload,
        token: token,
      });
    });
  }
};
/******************Forget Password**************** */

exports.forgotPasswordController = (req, res) => {
  const { email } = req.body;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const firstError = errors.array().map((error) => error.msg)[0];
    return res.status(422).json({
      errors: firstError,
    });
  } else {
    User.findOne(
      {
        email,
      },
      (err, user) => {
        if (err || !user) {
          return res.status(400).json({
            error: "User with that email does not exist",
            success: false,
          });
        }

        const token = jwt.sign(
          {
            user: user._id,
          },
          process.env.JWT_RESET_PASSWORD,
          {
            expiresIn: "24h",
          }
        );

        const emailData = {
          from: process.env.EMAIL_FROM,
          to: email,
          subject: `Password Reset link`,
          html: `
                    <h1>Please use the following link to reset your password</h1>
                    <p>${process.env.CLIENT_URL}/resetpassword/${token}</p>
                    <hr />
                    <p>This email may contain sensetive information</p>
                    <p>${process.env.CLIENT_URL}</p>
                `,
        };
        console.log(token);

        return user.updateOne(
          {
            resetPasswordLink: token,
          },
          (err, success) => {
            if (err) {
              console.log("RESET PASSWORD LINK ERROR", err);
              return res.status(400).json({
                error:
                  "Database connection error on user password forgot request",
                success: false,
              });
            } else {
              smtpTransport
                .sendMail(emailData)
                .then((sent) => {
                  // console.log('SIGNUP EMAIL SENT', sent)
                  return res.json({
                    message: `Email has been sent to ${email}. Follow the instruction to activate your account`,
                    success: true,
                  });
                })
                .catch((err) => {
                  // console.log('SIGNUP EMAIL SENT ERROR', err)
                  return res.json({
                    message: err.message,
                  });
                });
            }
          }
        );
      }
    );
  }
};

exports.resetPasswordController = (req, res) => {
  const { resetPasswordLink, newPassword } = req.body;

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const firstError = errors.array().map((error) => error.msg)[0];
    return res.status(422).json({
      errors: firstError,
    });
  } else {
    if (resetPasswordLink) {
      jwt.verify(
        resetPasswordLink,
        process.env.JWT_RESET_PASSWORD,
        function (err, decoded) {
          if (err) {
            return res.status(400).json({
              error: "Expired link. Try again",
              success: false,
            });
          }

          User.findOne(
            {
              resetPasswordLink,
            },
            (err, user) => {
              if (err || !user) {
                return res.status(400).json({
                  error: "Something went wrong. Try later" + err,
                  success: false,
                });
              }

              const updatedFields = {
                password: newPassword,
                resetPasswordLink: "",
              };

              user = _.extend(user, updatedFields);

              user.save((err, result) => {
                if (err) {
                  return res.status(400).json({
                    error: "Error resetting user password",
                    success: false,
                  });
                }
                res.json({
                  message: `Great! Now you can login with your new password`,
                  success: true,
                });
              });
            }
          );
        }
      );
    }
  }
};

exports.getLoggedInUser = (req, res) => {
  const decodedJWT = jwt.decode(req.cookies.userToken, { complete: true });
  console.log(decodedJWT);
  if (decodedJWT !== null) {
    User.findById(decodedJWT.payload._id)
      .then((user) => res.json(user))
      .catch((err) => res.json(err));
  } else {
    return res.send("no current user ");
  }
};

// Sign out
exports.signOutController = async (req, res) => {
  res.clearCookie("userToken");
  res.sendStatus(200);
};
