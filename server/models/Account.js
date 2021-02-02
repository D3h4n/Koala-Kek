const mongoose = require("mongoose");

const accountSchema = new mongoose.Schema(
  {
    displayName: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
      required: true,
    },
    passWord: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Account", accountSchema);
