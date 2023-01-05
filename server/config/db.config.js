const mongoose = require("mongoose");

mongoose.connect(
  process.env.MONGO_URI,
  // "mongodb://localhost:27017",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (!err) {
      console.log("MongoDB Connection Succeded");
    } else {
      console.log("Error in DB conncection: " + err);
    }
  }
);
