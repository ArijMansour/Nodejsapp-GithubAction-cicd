require("dotenv").config();

const smsKey = process.env.SMS_SECRET_KEY;
const twilioNum = process.env.TWILIO_PHONE_NUMBER;

const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;
const client = require("twilio")(accountSid, authToken);

module.exports = {
  smsKey,
  twilioNum,
  accountSid,
  authToken,
  client,
};
