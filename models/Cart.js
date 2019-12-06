const mongoose = require("mongoose");
module.exports = mongoose.model(
  "Cart",
  mongoose.Schema(
    {
      uid: {
        type: String,
        require: true
      },
      items: {
        type: [],
        require: true
      }
    },
    { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
  )
);
