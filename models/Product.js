const mongoose = require("mongoose");
module.exports = mongoose.model(
  "Product",
  mongoose.Schema(
    {
      name: {
        type: String,
        require: true
      },
      descritopn: {
        type: String
      },
      price: {
        type: Number,
        require: true
      }
    },
    { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
  )
);
